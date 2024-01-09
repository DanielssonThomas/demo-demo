type FilterProps = {
  type?: "events" | "users";
  setShowVerified: React.Dispatch<React.SetStateAction<boolean | null>>;
  setSortDate: React.Dispatch<React.SetStateAction<"latest" | "oldest">>;
};

export const Filter = ({ type, setShowVerified, setSortDate }: FilterProps) => {
  return (
    <div className="flex justify-between border-[1px] border-solid border-black dark:border-white rounded-md w-full p-4 dark:text-light-text">
      <div className="flex flex-col justify-center">
        <h2 className="text-xl">Filter</h2>
      </div>
      <section className="flex gap-4">
        <div className="flex flex-col items-center">
          <h3>Verified</h3>
          <select
            className="border-solid border-[0.1px] rounded-sm dark:border-white dark:bg-dark-bg"
            onChange={(e) => {
              if (e.target.value === "both") {
                setShowVerified(null);
              } else if (e.target.value === "yes") {
                setShowVerified(true);
              } else {
                setShowVerified(false);
              }
            }}
          >
            <option value="both">Both</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        {type === "events" ? (
          <div className="flex flex-col items-center">
            <h3>Sort by</h3>
            <select
              className="border-[1px] border-solid border-black dark:border-white dark:text-white rounded-sm bg-light-bg dark:bg-dark-bg"
              onChange={(e) =>
                setSortDate(e.target.value as "latest" | "oldest")
              }
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        ) : (
          <></>
        )}
      </section>
    </div>
  );
};
