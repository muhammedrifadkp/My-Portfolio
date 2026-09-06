import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, isFirebaseConfigured } from '../config/firebase';
import { collection, doc, setDoc, updateDoc, deleteDoc, onSnapshot, getDocs } from 'firebase/firestore';

const AuthContext = createContext();

const TEACHER_MASTER_PIN = 'SIRAJ-2026';
const TEACHER_ALT_PIN = '1234';

const DEMO_NAMES = ['muhammed rifad', 'ameen farhan', 'shibili k', 'fida jasmine', 'rashid k'];

// Default initial pre-seeded students list (Empty for clean production database)
const DEFAULT_STUDENTS = [];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      // 1. Check persistent Teacher session first
      const teacherSession = localStorage.getItem('sh_teacher_session');
      if (teacherSession) return JSON.parse(teacherSession);

      // 2. Check tab/session-only Student session
      const studentSession = sessionStorage.getItem('sh_student_session');
      if (studentSession) return JSON.parse(studentSession);
    } catch (e) {
      console.error('Failed to parse user session:', e);
    }
    return null;
  });

  const [studentsList, setStudentsList] = useState(() => {
    const saved = localStorage.getItem('sh_students_db');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const cleaned = parsed.filter(s => s && s.name && !DEMO_NAMES.includes(s.name.trim().toLowerCase()));
        localStorage.setItem('sh_students_db', JSON.stringify(cleaned));
        return cleaned;
      } catch (e) {
        console.error('Failed to parse local students DB:', e);
      }
    }
    return DEFAULT_STUDENTS;
  });

  // Completed classes/topics state: map of { [batchId]: [classId1, classId2] }
  const [completedTopics, setCompletedTopics] = useState(() => {
    const saved = localStorage.getItem('sh_completed_topics');
    return saved ? JSON.parse(saved) : {};
  });

  // Save session: Teacher -> localStorage (persistent), Student/Guest -> sessionStorage (wiped on tab/Chrome close)
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'teacher') {
        localStorage.setItem('sh_teacher_session', JSON.stringify(currentUser));
        sessionStorage.removeItem('sh_student_session');
      } else if (currentUser.role === 'student' || currentUser.role === 'guest') {
        sessionStorage.setItem('sh_student_session', JSON.stringify(currentUser));
        localStorage.removeItem('sh_teacher_session');
      }
    } else {
      localStorage.removeItem('sh_teacher_session');
      sessionStorage.removeItem('sh_student_session');
    }
  }, [currentUser]);

  // 1. Live Firestore Sync for Students
  useEffect(() => {
    if (!isFirebaseConfigured || !db) return;

    // Real-time listener for students collection in Cloud Firestore
    const unsubscribe = onSnapshot(
      collection(db, 'students'),
      async (snapshot) => {
        if (!snapshot.empty) {
          const firestoreStudents = snapshot.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .filter((s) => s && s.name && !DEMO_NAMES.includes(s.name.trim().toLowerCase()));

          setStudentsList(firestoreStudents);
          localStorage.setItem('sh_students_db', JSON.stringify(firestoreStudents));
        } else {
          setStudentsList([]);
          localStorage.setItem('sh_students_db', JSON.stringify([]));
        }
      },
      (error) => {
        console.error('Firebase students listener error:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  // 2. Live Firestore Sync for Topic Completion Progress
  useEffect(() => {
    if (!isFirebaseConfigured || !db) return;

    const unsubscribeProgress = onSnapshot(
      doc(db, 'syllabus_progress', 'topics'),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCompletedTopics(data);
          localStorage.setItem('sh_completed_topics', JSON.stringify(data));
        }
      },
      (error) => {
        console.error('Firebase progress listener error:', error);
      }
    );

    return () => unsubscribeProgress();
  }, []);

  // Save session to local storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('sh_user_session', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('sh_user_session');
    }
  }, [currentUser]);

  // Save fallback to local storage
  useEffect(() => {
    localStorage.setItem('sh_students_db', JSON.stringify(studentsList));
  }, [studentsList]);

  useEffect(() => {
    localStorage.setItem('sh_completed_topics', JSON.stringify(completedTopics));
  }, [completedTopics]);

  // Login handler
  const login = (credentials) => {
    const { role, name, rollNo, batch, pin } = credentials;

    if (role === 'guest') {
      const selectedBatch = (batch || '+1').trim().toLowerCase();
      const guestUser = {
        id: `guest-${Date.now()}`,
        name: 'Guest Student',
        batch: selectedBatch,
        role: 'guest'
      };
      setCurrentUser(guestUser);
      return { success: true, message: `Guest access granted for ${selectedBatch.toUpperCase()} syllabus.` };
    }

    if (role === 'teacher') {
      if (pin === TEACHER_MASTER_PIN || pin === TEACHER_ALT_PIN) {
        const teacherUser = {
          name: name || 'IT Sir / Teacher',
          role: 'teacher',
          batch: 'all'
        };
        setCurrentUser(teacherUser);
        return { success: true, message: 'Welcome IT Sir! Teacher Access Granted.' };
      } else {
        return { success: false, message: 'Invalid Teacher Master PIN.' };
      }
    }

    if (role === 'student') {
      const cleanName = (name || '').trim();
      const cleanPin = (pin || '').trim();
      const selectedBatch = (batch || '').trim().toLowerCase();

      if (!cleanName) {
        return { success: false, message: 'Please enter your Student Name.' };
      }
      if (!selectedBatch) {
        return { success: false, message: 'Please select your Batch.' };
      }
      if (!cleanPin) {
        return { success: false, message: 'Please enter your Password / PIN.' };
      }

      // Check existing student DB match
      const matchingStudent = studentsList.find(
        (s) => s.name.toLowerCase() === cleanName.toLowerCase()
      );

      if (matchingStudent) {
        // 1. Strict Batch Check
        const registeredBatch = (matchingStudent.batch || '').toLowerCase();
        if (registeredBatch !== selectedBatch) {
          return {
            success: false,
            message: `Incorrect Batch! Student '${matchingStudent.name}' is registered under ${registeredBatch.toUpperCase()} Batch.`
          };
        }

        // 2. Strict PIN Check
        if (matchingStudent.pin !== cleanPin) {
          return { success: false, message: `Incorrect Password / PIN for ${matchingStudent.name}.` };
        }

        // Login Success for registered student
        const studentUser = {
          id: matchingStudent.id,
          name: matchingStudent.name,
          batch: registeredBatch,
          role: 'student'
        };
        setCurrentUser(studentUser);
        return { success: true, message: `Welcome ${studentUser.name}! Unlocked ${studentUser.batch.toUpperCase()} syllabus.` };
      }

      // If new student (not pre-seeded), check PIN (1234)
      if (cleanPin === '1234') {
        const newStudentUser = {
          id: `std-${Date.now()}`,
          name: cleanName,
          batch: selectedBatch,
          role: 'student'
        };
        setCurrentUser(newStudentUser);
        return { success: true, message: `Welcome ${newStudentUser.name}! Unlocked ${newStudentUser.batch.toUpperCase()} syllabus.` };
      }

      return { success: false, message: 'Student credentials not found or incorrect PIN.' };
    }

    return { success: false, message: 'Invalid role selected.' };
  };

  // Logout handler
  const logout = () => {
    setCurrentUser(null);
  };

  // Teacher registers a new student (Saves to Cloud Firestore + Local state)
  const registerStudent = async (newStudentData) => {
    const newStudent = {
      id: `std-${Date.now()}`,
      name: newStudentData.name.trim(),
      batch: newStudentData.batch,
      pin: newStudentData.pin || '1234',
      createdAt: new Date().toISOString()
    };

    // 1. Update local state immediately
    setStudentsList((prev) => [...prev, newStudent]);

    // 2. Persist to Cloud Firestore if connected
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'students', newStudent.id), newStudent);
        console.log('✅ New student saved to Firebase Firestore Cloud:', newStudent.name);
      } catch (err) {
        console.error('⚠️ Failed to save student to Firestore:', err);
      }
    }

    return newStudent;
  };

  // Edit/Update Student details (Cloud Firestore + Local)
  const updateStudent = async (studentId, updatedData) => {
    setStudentsList((prev) => {
      const updated = prev.map((std) =>
        std.id === studentId ? { ...std, ...updatedData } : std
      );
      localStorage.setItem('sh_students_db', JSON.stringify(updated));
      return updated;
    });

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'students', studentId), updatedData, { merge: true });
        console.log('✅ Student updated in Firebase Firestore Cloud:', studentId);
      } catch (err) {
        console.error('⚠️ Failed to update student in Firestore:', err);
      }
    }
  };

  // Delete Student (Cloud Firestore + Local)
  const deleteStudent = async (studentId) => {
    setStudentsList((prev) => {
      const updated = prev.filter((std) => std.id !== studentId);
      localStorage.setItem('sh_students_db', JSON.stringify(updated));
      return updated;
    });

    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'students', studentId));
        console.log('✅ Student deleted from Firebase Firestore Cloud:', studentId);
      } catch (err) {
        console.error('⚠️ Failed to delete student from Firestore:', err);
      }
    }
  };

  // Toggle completion status for a class/topic in a batch
  const toggleClassCompletion = async (batchId, classId) => {
    const currentBatchCompleted = completedTopics[batchId] || [];
    const exists = currentBatchCompleted.includes(classId);
    const updatedBatchCompleted = exists
      ? currentBatchCompleted.filter((id) => id !== classId)
      : [...currentBatchCompleted, classId];

    const updatedTopics = {
      ...completedTopics,
      [batchId]: updatedBatchCompleted
    };

    setCompletedTopics(updatedTopics);

    // Sync progress to Firebase Cloud Firestore
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'syllabus_progress', 'topics'), updatedTopics);
      } catch (err) {
        console.error('⚠️ Failed to sync progress to Firestore:', err);
      }
    }
  };

  const isClassCompleted = (batchId, classId) => {
    return (completedTopics[batchId] || []).includes(classId);
  };

  const getBatchCompletionStats = (batchId, totalCount) => {
    const completedCount = (completedTopics[batchId] || []).length;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    return { completedCount, totalCount, percentage };
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userRole: currentUser?.role || 'guest',
        userBatch: currentUser?.batch || null,
        studentsList,
        completedTopics,
        login,
        logout,
        registerStudent,
        updateStudent,
        deleteStudent,
        toggleClassCompletion,
        isClassCompleted,
        getBatchCompletionStats
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

