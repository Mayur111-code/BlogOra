// components/shared/Container.jsx
export const Container = ({ children }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {children}
  </div>
);

// components/shared/SectionTitle.jsx
export const SectionTitle = ({ children, subtitle }) => (
  <div className="mb-10 text-center sm:text-left">
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
      {children}
    </h2>
    {subtitle && <p className="mt-2 text-gray-500 text-lg">{subtitle}</p>}
    <div className="mt-2 h-1 w-20 bg-orange-500 rounded-full mx-auto sm:mx-0"></div>
  </div>
);