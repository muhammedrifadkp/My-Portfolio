import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Survey.css';

const Survey = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    courseClass: '',
    division: '',
    skillLevel: '',
    toolsKnown: [],
    otherToolsKnown: '',
    skillsToLearn: [],
    otherSkillsToLearn: '',
    mostInterestedSkill: '',
    otherMostInterestedSkill: '',
    mainGoal: '',
    specificTopics: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [activeCard, setActiveCard] = useState(null);

  const SCRIPT_URL = import.meta.env.VITE_SURVEY_SCRIPT_URL || '';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const courseOptions = [
    'Plus One',
    'Plus Two',
    'Degree 1st Year',
    'Degree 2nd Year',
    'Degree 3rd Year',
    'PG 1st Year',
    'PG 2nd Year'
  ];

  const skillLevels = [
    'Beginner',
    'Basic',
    'Intermediate',
    'Good',
    'Advanced'
  ];

  const toolsKnownList = [
    'MS Word',
    'MS Excel',
    'MS PowerPoint',
    'Photoshop',
    'Illustrator',
    'Canva',
    'Video Editing',
    'Web Development',
    'Other:'
  ];

  const skillsToLearnList = [
    'Advanced MS Word',
    'Advanced MS Excel',
    'PowerPoint / Presentation Design',
    'Photoshop',
    'Adobe Illustrator',
    'Canva & Graphic Design',
    'Video Editing',
    'Web Development',
    'HTML & CSS',
    'JavaScript',
    'Python',
    'AI Tools',
    'Digital Marketing',
    'Other:'
  ];

  const mostInterestedSkillOptions = [
    'Graphic Design',
    'Web Development',
    'Video Editing',
    'MS Office',
    'AI Tools',
    'Digital Marketing',
    'Programming',
    'Other:'
  ];

  const mainGoalOptions = [
    'Improve my computer skills',
    'Create projects',
    'Get a job',
    'Freelancing',
    'Start a business',
    'Academic purposes',
    'Personal interest'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleCheckboxChange = (category, item) => {
    setFormData(prev => {
      const currentList = prev[category];
      let updatedList;
      if (currentList.includes(item)) {
        updatedList = currentList.filter(i => i !== item);
      } else {
        updatedList = [...currentList, item];
      }
      return { ...prev, [category]: updatedList };
    });
    if (errors[category]) {
      setErrors(prev => ({ ...prev, [category]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'This is a required question';
    }

    if (!formData.courseClass) {
      newErrors.courseClass = 'This is a required question';
    }

    if (!formData.division) {
      newErrors.division = 'This is a required question';
    }

    if (!formData.skillLevel) {
      newErrors.skillLevel = 'This is a required question';
    }

    if (formData.toolsKnown.length === 0) {
      newErrors.toolsKnown = 'This is a required question';
    }

    if (formData.skillsToLearn.length === 0) {
      newErrors.skillsToLearn = 'This is a required question';
    }

    if (!formData.mostInterestedSkill) {
      newErrors.mostInterestedSkill = 'This is a required question';
    } else if (formData.mostInterestedSkill === 'Other:' && !formData.otherMostInterestedSkill.trim()) {
      newErrors.mostInterestedSkill = 'Please specify your answer for Other';
    }

    if (!formData.mainGoal) {
      newErrors.mainGoal = 'This is a required question';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstErrorElement = document.querySelector('.gf-error-msg');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    // Format Known Tools
    const knownToolsFormatted = formData.toolsKnown.map(tool => {
      if (tool === 'Other:' && formData.otherToolsKnown.trim()) {
        return `Other: ${formData.otherToolsKnown.trim()}`;
      }
      return tool;
    }).filter(t => t !== 'Other:');

    // Format Skills to Learn
    const learningInterestsFormatted = formData.skillsToLearn.map(skill => {
      if (skill === 'Other:' && formData.otherSkillsToLearn.trim()) {
        return `Other: ${formData.otherSkillsToLearn.trim()}`;
      }
      return skill;
    }).filter(s => s !== 'Other:');

    // Format Most Interested Skill
    const mostInterestedFormatted = formData.mostInterestedSkill === 'Other:'
      ? `Other: ${formData.otherMostInterestedSkill.trim()}`
      : formData.mostInterestedSkill;

    // Mapped Fields sent to Apps Script
    const payload = {
      fullName: formData.fullName.trim(),
      course: formData.courseClass,
      division: formData.division,
      currentSkill: formData.skillLevel,
      knownTools: knownToolsFormatted.join(', '),
      learningInterests: learningInterestsFormatted.join(', '),
      mostInterestedSkill: mostInterestedFormatted,
      mainGoal: formData.mainGoal,
      specificLearning: formData.specificTopics.trim()
    };

    // Store in localStorage backup
    try {
      const existingSurveys = JSON.parse(localStorage.getItem('student_surveys') || '[]');
      existingSurveys.push({ ...payload, timestamp: new Date().toISOString() });
      localStorage.setItem('student_surveys', JSON.stringify(existingSurveys));
    } catch (err) {
      console.error('Storage error:', err);
    }

    try {
      if (SCRIPT_URL && SCRIPT_URL.trim() !== '') {
        await fetch(SCRIPT_URL.trim(), {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
      }
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitting(false);
      setSubmitError('Something went wrong. Please try again.');
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      courseClass: '',
      division: '',
      skillLevel: '',
      toolsKnown: [],
      otherToolsKnown: '',
      skillsToLearn: [],
      otherSkillsToLearn: '',
      mostInterestedSkill: '',
      otherMostInterestedSkill: '',
      mainGoal: '',
      specificTopics: ''
    });
    setErrors({});
    setSubmitError(null);
    setSubmitted(false);
    window.scrollTo(0, 0);
  };

  const handleExit = () => {
    navigate('/');
  };

  return (
    <div className="gf-page-bg">
      <div className="gf-container">
        {/* Success Popup Modal */}
        {submitted && (
          <div className="gf-modal-overlay">
            <div className="gf-modal-card">
              <div className="gf-modal-stripe"></div>
              <div className="gf-modal-icon-circle">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h2 className="gf-modal-title">Submission Successful!</h2>
              <p className="gf-modal-msg">
                Thank you! Your response has been submitted successfully.
              </p>
              <div className="gf-modal-actions">
                <button onClick={handleExit} className="gf-modal-btn-primary">
                  Exit
                </button>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Header Card */}
          <div
            className={`gf-card gf-header-card ${activeCard === 'header' ? 'gf-card-active' : ''}`}
            onClick={() => setActiveCard('header')}
          >
            <div className="gf-header-stripe"></div>
            <h1 className="gf-title">Sirajul Huda Student IT & Digital Skills Interest Survey</h1>
            <p className="gf-subtitle">
              This survey is conducted to understand your current technical skills, interests and the digital skills you would like to learn. Your responses will help us plan practical skill-development sessions.
            </p>
            <div className="gf-required-notice">* Indicates required question</div>
          </div>

          {/* Question 1: Full Name */}
          <div
            className={`gf-card ${errors.fullName ? 'gf-card-error' : ''} ${activeCard === 'fullName' ? 'gf-card-active' : ''}`}
            onClick={() => setActiveCard('fullName')}
          >
            <div className="gf-question-title">
              Full Name <span className="gf-required">*</span>
            </div>
            <div className="gf-input-wrapper">
              <input
                type="text"
                name="fullName"
                className="gf-text-input"
                placeholder="Your answer"
                value={formData.fullName}
                onChange={handleInputChange}
                onFocus={() => setActiveCard('fullName')}
              />
            </div>
            {errors.fullName && <div className="gf-error-msg">⚠️ {errors.fullName}</div>}
          </div>

          {/* Question 2: Course / Class */}
          <div
            className={`gf-card ${errors.courseClass ? 'gf-card-error' : ''} ${activeCard === 'courseClass' ? 'gf-card-active' : ''}`}
            onClick={() => setActiveCard('courseClass')}
          >
            <div className="gf-question-title">
              Course / Class <span className="gf-required">*</span>
            </div>
            <div className="gf-input-wrapper">
              <select
                name="courseClass"
                className="gf-select-box"
                value={formData.courseClass}
                onChange={handleInputChange}
                onFocus={() => setActiveCard('courseClass')}
              >
                <option value="">Choose</option>
                {courseOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            {errors.courseClass && <div className="gf-error-msg">⚠️ {errors.courseClass}</div>}
          </div>

          {/* Question: Division / Batch */}
          <div
            className={`gf-card ${errors.division ? 'gf-card-error' : ''} ${activeCard === 'division' ? 'gf-card-active' : ''}`}
            onClick={() => setActiveCard('division')}
          >
            <div className="gf-question-title">
              Division / Batch <span className="gf-required">*</span>
            </div>
            <div className="gf-input-wrapper">
              <select
                name="division"
                className="gf-select-box"
                value={formData.division}
                onChange={handleInputChange}
                onFocus={() => setActiveCard('division')}
              >
                <option value="">Choose</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>
            {errors.division && <div className="gf-error-msg">⚠️ {errors.division}</div>}
          </div>

          {/* Question 3: Current Skill Level */}
          <div
            className={`gf-card ${errors.skillLevel ? 'gf-card-error' : ''} ${activeCard === 'skillLevel' ? 'gf-card-active' : ''}`}
            onClick={() => setActiveCard('skillLevel')}
          >
            <div className="gf-question-title">
              How would you rate your current computer skills? <span className="gf-required">*</span>
            </div>
            <div className="gf-radio-group">
              {skillLevels.map((lvl) => (
                <label key={lvl} className="gf-radio-label">
                  <input
                    type="radio"
                    name="skillLevel"
                    value={lvl}
                    checked={formData.skillLevel === lvl}
                    onChange={handleInputChange}
                  />
                  <span className="gf-radio-text">{lvl}</span>
                </label>
              ))}
            </div>
            {errors.skillLevel && <div className="gf-error-msg">⚠️ {errors.skillLevel}</div>}
          </div>

          {/* Question 4: Software / Tools Known */}
          <div
            className={`gf-card ${errors.toolsKnown ? 'gf-card-error' : ''} ${activeCard === 'toolsKnown' ? 'gf-card-active' : ''}`}
            onClick={() => setActiveCard('toolsKnown')}
          >
            <div className="gf-question-title">
              Which software/tools do you already know? <span className="gf-required">*</span>
            </div>
            <div className="gf-checkbox-group">
              {toolsKnownList.map((tool) => (
                <div key={tool}>
                  {tool === 'Other:' ? (
                    <div className="gf-other-option-row">
                      <label className="gf-checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.toolsKnown.includes('Other:')}
                          onChange={() => handleCheckboxChange('toolsKnown', 'Other:')}
                        />
                        <span className="gf-checkbox-text">Other:</span>
                      </label>
                      <input
                        type="text"
                        name="otherToolsKnown"
                        className="gf-text-input gf-inline-other-input"
                        value={formData.otherToolsKnown}
                        onChange={handleInputChange}
                        onFocus={() => {
                          if (!formData.toolsKnown.includes('Other:')) {
                            handleCheckboxChange('toolsKnown', 'Other:');
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <label className="gf-checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.toolsKnown.includes(tool)}
                        onChange={() => handleCheckboxChange('toolsKnown', tool)}
                      />
                      <span className="gf-checkbox-text">{tool}</span>
                    </label>
                  )}
                </div>
              ))}
            </div>
            {errors.toolsKnown && <div className="gf-error-msg">⚠️ {errors.toolsKnown}</div>}
          </div>

          {/* Question 5: Skills to Learn */}
          <div
            className={`gf-card ${errors.skillsToLearn ? 'gf-card-error' : ''} ${activeCard === 'skillsToLearn' ? 'gf-card-active' : ''}`}
            onClick={() => setActiveCard('skillsToLearn')}
          >
            <div className="gf-question-title">
              What would you like to learn? <span className="gf-required">*</span>
            </div>
            <div className="gf-checkbox-group">
              {skillsToLearnList.map((skill) => (
                <div key={skill}>
                  {skill === 'Other:' ? (
                    <div className="gf-other-option-row">
                      <label className="gf-checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.skillsToLearn.includes('Other:')}
                          onChange={() => handleCheckboxChange('skillsToLearn', 'Other:')}
                        />
                        <span className="gf-checkbox-text">Other:</span>
                      </label>
                      <input
                        type="text"
                        name="otherSkillsToLearn"
                        className="gf-text-input gf-inline-other-input"
                        value={formData.otherSkillsToLearn}
                        onChange={handleInputChange}
                        onFocus={() => {
                          if (!formData.skillsToLearn.includes('Other:')) {
                            handleCheckboxChange('skillsToLearn', 'Other:');
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <label className="gf-checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.skillsToLearn.includes(skill)}
                        onChange={() => handleCheckboxChange('skillsToLearn', skill)}
                      />
                      <span className="gf-checkbox-text">{skill}</span>
                    </label>
                  )}
                </div>
              ))}
            </div>
            {errors.skillsToLearn && <div className="gf-error-msg">⚠️ {errors.skillsToLearn}</div>}
          </div>

          {/* Question 6: Most Interested Skill */}
          <div
            className={`gf-card ${errors.mostInterestedSkill ? 'gf-card-error' : ''} ${activeCard === 'mostInterestedSkill' ? 'gf-card-active' : ''}`}
            onClick={() => setActiveCard('mostInterestedSkill')}
          >
            <div className="gf-question-title">
              Which skill are you MOST interested in? <span className="gf-required">*</span>
            </div>
            <div className="gf-radio-group">
              {mostInterestedSkillOptions.map((option) => (
                <div key={option}>
                  {option === 'Other:' ? (
                    <div className="gf-other-option-row">
                      <label className="gf-radio-label">
                        <input
                          type="radio"
                          name="mostInterestedSkill"
                          value="Other:"
                          checked={formData.mostInterestedSkill === 'Other:'}
                          onChange={handleInputChange}
                        />
                        <span className="gf-radio-text">Other:</span>
                      </label>
                      <input
                        type="text"
                        name="otherMostInterestedSkill"
                        className="gf-text-input gf-inline-other-input"
                        value={formData.otherMostInterestedSkill}
                        onChange={handleInputChange}
                        onFocus={() => {
                          setFormData(prev => ({ ...prev, mostInterestedSkill: 'Other:' }));
                        }}
                      />
                    </div>
                  ) : (
                    <label className="gf-radio-label">
                      <input
                        type="radio"
                        name="mostInterestedSkill"
                        value={option}
                        checked={formData.mostInterestedSkill === option}
                        onChange={handleInputChange}
                      />
                      <span className="gf-radio-text">{option}</span>
                    </label>
                  )}
                </div>
              ))}
            </div>
            {errors.mostInterestedSkill && <div className="gf-error-msg">⚠️ {errors.mostInterestedSkill}</div>}
          </div>

          {/* Question 7: Main Goal */}
          <div
            className={`gf-card ${errors.mainGoal ? 'gf-card-error' : ''} ${activeCard === 'mainGoal' ? 'gf-card-active' : ''}`}
            onClick={() => setActiveCard('mainGoal')}
          >
            <div className="gf-question-title">
              What is your main goal? <span className="gf-required">*</span>
            </div>
            <div className="gf-radio-group">
              {mainGoalOptions.map((goal) => (
                <label key={goal} className="gf-radio-label">
                  <input
                    type="radio"
                    name="mainGoal"
                    value={goal}
                    checked={formData.mainGoal === goal}
                    onChange={handleInputChange}
                  />
                  <span className="gf-radio-text">{goal}</span>
                </label>
              ))}
            </div>
            {errors.mainGoal && <div className="gf-error-msg">⚠️ {errors.mainGoal}</div>}
          </div>

          {/* Question 8: Anything Specific */}
          <div
            className={`gf-card ${activeCard === 'specificTopics' ? 'gf-card-active' : ''}`}
            onClick={() => setActiveCard('specificTopics')}
          >
            <div className="gf-question-title">
              Anything specific you want to learn?
            </div>
            <div className="gf-question-sub" style={{ marginBottom: '12px', marginTop: '-10px' }}>
              Mention any software, technology, or skill you would like to learn.
            </div>
            <div className="gf-input-wrapper">
              <input
                type="text"
                name="specificTopics"
                className="gf-text-input"
                placeholder="Your answer"
                value={formData.specificTopics}
                onChange={handleInputChange}
                onFocus={() => setActiveCard('specificTopics')}
              />
            </div>
          </div>

          {submitError && (
            <div className="gf-card gf-card-error" style={{ borderLeft: '6px solid #d93025', backgroundColor: '#fdf2f2', padding: '16px', color: '#d93025', fontWeight: '500' }}>
              ⚠️ {submitError}
            </div>
          )}

          {/* Actions */}
          <div className="gf-actions-row">
            <button type="submit" className="gf-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            <button type="button" onClick={handleReset} className="gf-clear-btn" disabled={isSubmitting}>
              Clear form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Survey;
