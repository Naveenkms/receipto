function PageHeader({ children }: { children: React.ReactNode }) {
  return (
    <header className="flex w-full h-12 shrink-0 items-center gap-2 border-b transition-[width] ease-linear ">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <h1 className="text-base font-medium">{children}</h1>
      </div>
    </header>
  );
}

export default PageHeader;
