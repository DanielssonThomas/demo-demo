import Client from "@/components/admin/client";

type ClientPageProps = {
  params: { clientId: number };
};

const ClientPage = async ({ params: { clientId } }: ClientPageProps) => {
  return <Client id={clientId} />;
};

export default ClientPage;
