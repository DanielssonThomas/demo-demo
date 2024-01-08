import { useRouter, usePathname } from "next/navigation";
import TD from "../../tableDataCell/Td";

type UserRowProps = {
  id: number;
  name: string;
  role: string;
  verified: boolean | null;
};

export const UserRow = ({ id, name, role, verified }: UserRowProps) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <tr
      className="h-[3rem] border-[1px] border-solid rounded-sm border-black dark:border-white transition-all duration-300 hover:scale-[1.02] hover:p-4 
  cursor-pointer"
      onClick={() => router.push(pathname + `/${id}`)}
    >
      <TD type="default" text={name} />
      <TD type="default" text={role} />
      <TD
        type="boolean"
        text={verified ? "yes" : "no"}
        boolean={verified ?? false}
      />
    </tr>
  );
};
