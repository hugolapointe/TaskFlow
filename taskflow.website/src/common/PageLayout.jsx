import PageHeader from './PageHeader';

const PageLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <PageHeader />
      <div className="max-w-[900px] mx-auto px-12 py-8">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default PageLayout;
