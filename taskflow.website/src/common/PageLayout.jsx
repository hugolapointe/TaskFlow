import PageHeader from './PageHeader';

const PageLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100">
            <PageHeader />
            <div className="max-w-[900px] mx-auto px-4 sm:px-8 lg:px-12 py-4 sm:py-6 lg:py-8">
                <main>{children}</main>
            </div>
        </div>
    );
};

export default PageLayout;
