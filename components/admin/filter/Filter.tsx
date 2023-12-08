type FilterProps = {
  setShow: React.Dispatch<React.SetStateAction<"users" | "events">>;
  setShowVerified: React.Dispatch<React.SetStateAction<boolean | null>>;
  setSortDate: React.Dispatch<React.SetStateAction<"latest" | "oldest">>;
};

export const Filter = ({
  setShow,
  setShowVerified,
  setSortDate,
}: FilterProps) => {
  return (
    <div className="border-[1px] border-solid border-black rounded-md w-full p-4">
      <h2 className="text-xl">Filter</h2>
      <section className="flex justify-around">
        <div>
          <h3>Type</h3>
          <select
            onChange={(e) => setShow(e.target.value as "users" | "events")}
          >
            <option value="events">Events</option>
            <option value="users">Users</option>
          </select>
        </div>
        <div>
          <h3>Verified</h3>
          <select
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
        <div>
          <h3>Sort by</h3>
          <select
            onChange={(e) => setSortDate(e.target.value as "latest" | "oldest")}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </section>
    </div>
  );
};
