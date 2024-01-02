import { useRouter, usePathname } from "next/navigation";

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
      className="h-[3rem] border-[1px] border-solid rounded-sm border-black transition-all duration-300 hover:scale-[1.02] hover:p-4 
  cursor-pointer"
      onClick={() => router.push(pathname + `/${id}`)}
    >
      <td className="text-center">{name}</td>
      <td className="text-center">{role}</td>
      <td className="text-center">{verified ? "true" : "false"}</td>
    </tr>
  );
};
