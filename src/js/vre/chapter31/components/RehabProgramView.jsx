import React from 'react';

export default function RehabProgramView({ formData }) {
  return (
    <div>
      <strong>{formData.program}</strong><br/>
      {formData.yearStarted} &mdash; {formData.yearLeft}
    </div>
  );
}
