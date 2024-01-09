type TDBooleanProps = {
  text: string;
  boolean: boolean;
  type: "boolean";
};

type TDDefaultProps = {
  text: string;
  type: "default";
};

type TDprops = TDBooleanProps | TDDefaultProps;

const TD = (props: TDprops) => {
  const { type, text } = props;

  if (type === "default") {
    return <td className="text-center">{text}</td>;
  }

  if (type === "boolean") {
    const { boolean } = props;
    return (
      <td className="flex flex-col justify-center items-center">
        <p
          className={`${
            boolean ? "bg-green-400 bg-opacity-70" : "bg-red-400"
          } px-4 py-1 rounded-full mt-[7px]`}
        >
          {text}
        </p>
      </td>
    );
  }
};

export default TD;
