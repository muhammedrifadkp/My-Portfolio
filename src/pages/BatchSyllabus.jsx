import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBatchBySlug } from '../data/syllabusData';
import PlusOneSyllabus from '../components/syllabus/PlusOneSyllabus';
import PlusTwoSyllabus from '../components/syllabus/PlusTwoSyllabus';
import './BatchSyllabus.css';

const BatchSyllabus = () => {
  const { batchId } = useParams();
  const contentRef = useRef(null);

  const decodedBatchId = batchId ? decodeURIComponent(batchId) : '';
  const batch = getBatchBySlug(batchId);
  const batchName = batch ? batch.name : (decodedBatchId || 'Batch');
  const isPlusOne = decodedBatchId === '+1' || batchId === '+1';
  const isPlusTwo = decodedBatchId === '+2' || batchId === '+2' || batchId === 'plus-2';

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
