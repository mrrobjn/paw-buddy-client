export const ActionBar = ({ children }: { children?: any }) => {
  return (
    <div className="flex mx-5 mb-5 font-semibold rounded-md bg-secondary justify-between p-2">
      <div className="flex items-center">{children}</div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="p-2 bg-lg-blue rounded-md"
        />
      </div>
    </div>
  );
};
