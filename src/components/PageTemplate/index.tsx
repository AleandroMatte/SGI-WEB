import type { PropsWithChildren } from "react";

interface PageTemplateInterface {
  pageTitle: string;
}
export default function PageTemplate({
  pageTitle,
  children,
}: PropsWithChildren<PageTemplateInterface>) {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <div className="w-[100vw] bg-gray-200 p-3">
        <div className="ml-10">
          <h1 className="text-black">
            <b>{pageTitle}</b>
          </h1>
        </div>
      </div>
      {children}
    </div>
  );
}
