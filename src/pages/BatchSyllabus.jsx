import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBatchBySlug } from '../data/syllabusData';
import PlusOneSyllabus from '../components/syllabus/PlusOneSyllabus';
import PlusTwoSyllabus from '../components/syllabus/PlusTwoSyllabus';
import Degree1Syllabus from '../components/syllabus/Degree1Syllabus';
import Degree2Syllabus from '../components/syllabus/Degree2Syllabus';
import Degree3Syllabus from '../components/syllabus/Degree3Syllabus';
import Pg1Syllabus from '../components/syllabus/Pg1Syllabus';
import Pg2Syllabus from '../components/syllabus/Pg2Syllabus';
import './BatchSyllabus.css';

const BatchSyllabus = () => {
  const { batchId } = useParams();
  const contentRef = useRef(null);

  const decodedBatchId = batchId ? decodeURIComponent(batchId) : '';
  const batch = getBatchBySlug(batchId);
  const batchName = batch ? batch.name : (decodedBatchId || 'Batch');
  const normalizedId = (decodedBatchId || batchId || '').toLowerCase().trim();
  const isPlusOne = normalizedId === '+1' || normalizedId === 'plus-1' || normalizedId === 'plus 1';
  const isPlusTwo = normalizedId === '+2' || normalizedId === 'plus-2' || normalizedId === 'plus 2';
  const isDegreeOne = normalizedId === 'degree-1' || normalizedId === 'degree 1';
  const isDegreeTwo = normalizedId === 'degree-2' || normalizedId === 'degree 2';
  const isDegreeThree = normalizedId === 'degree-3' || normalizedId === 'degree 3';
  const isPgOne = normalizedId === 'pg-1' || normalizedId === 'pg 1';
  const isPgTwo = normalizedId === 'pg-2' || normalizedId === 'pg 2';

  return (
    <section className="batch-syllabus-page">
      <div className="batch-syllabus-wrapper">
        {/* Top Breadcrumb & Back Navigation */}
        <div className="syllabus-top-nav-bar">
          <Link to="/syllabus" className="back-link-btn">
            <i className="fas fa-arrow-left"></i> Back to Syllabus
          </Link>
          <div className="breadcrumb-trail">
            <Link to="/syllabus" className="breadcrumb-link">Syllabus</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{batchName} Digital Skills</span>
          </div>
        </div>

        {isPlusOne ? (
          <PlusOneSyllabus />
        ) : isPlusTwo ? (
          <PlusTwoSyllabus />
        ) : isDegreeOne ? (
          <Degree1Syllabus />
        ) : isDegreeTwo ? (
          <Degree2Syllabus />
        ) : isDegreeThree ? (
          <Degree3Syllabus />
        ) : isPgOne ? (
          <Pg1Syllabus />
        ) : isPgTwo ? (
          <Pg2Syllabus />
        ) : (
          <div className="batch-syllabus-card" ref={contentRef}>
            <div className="batch-header-block">
              <span className="batch-name-badge">{batchName}</span>
              <h1 className="batch-heading">Digital Skills Syllabus</h1>
              {batch?.subtitle && <p className="batch-subheading">{batch.subtitle}</p>}
            </div>

            {/* Clean empty syllabus area with placeholder text */}
            <div className="empty-syllabus-area">
              <div className="empty-state-icon">
                <i className="fas fa-book-open"></i>
              </div>
              <p className="placeholder-text">Syllabus will be added soon.</p>
              <div className="structure-indicator">
                <span className="dot pulse"></span>
                <span>Curriculum and learning modules are currently being prepared.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BatchSyllabus;
