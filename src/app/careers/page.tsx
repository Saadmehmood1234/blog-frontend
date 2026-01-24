const Careers = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 2xl:px-0">
      <h1 className="text-3xl font-bold mb-4">Careers at DailyTech</h1>
      <p className="mb-4">
        Join our team! DailyTech is looking for talented individuals passionate about technology and content creation.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Open Positions</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Frontend Developer</li>
        <li>Backend Developer</li>
        <li>Content Writer / Editor</li>
        <li>UI/UX Designer</li>
      </ul>
      <p>
        Send your resume to <a href="mailto:mehmoodsaad347@gmail.com" className="text-blue-600">careers@dailytech.com</a>.
      </p>
    </div>
  );
};

export default Careers;
