import React from 'react';

const PageHeader = ({ title, breadcrumb, children }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-sm text-gray-500">
          {Array.isArray(breadcrumb) ? breadcrumb.join(" > ") : breadcrumb}
        </p>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

export default PageHeader;

