type InputCheckBoxProps = {
  type: "checkbox";
  isChecked: boolean;
  name: string;
  headline: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  wrapperClass?: string;
  headlineClass?: string;
};

type InputTextProps = {
  type: "text";
  name: string;
  headline: string;
  value: string;
  wrapperClass?: string;
  headlineClass?: string;
  inputClass?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

type InputDateProps = {
  type: "date";
  value: string;
  name: string;
  headline: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  wrapperClass?: string;
  headlineClass?: string;
  inputClass?: string;
};

type InputReadOnlyTextProps = {
  type: "readOnly";
  headline: string;
  value: string | number | null;
  wrapperClass?: string;
  headlineClass?: string;
  inputClass?: string;
};

type InputNumberProps = {
  type: "number";
  name: string;
  headline: string;
  value: number;
  min?: number;
  max?: number;
  wrapperClass?: string;
  headlineClass?: string;
  inputClass?: string;
};

type InputTextAreaProps = {
  type: "textarea";
  name: string;
  headline: string;
  value: string;
  placeHolder?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
};

type InputTimeProps = {
  type: "time";
  value: string;
  name: string;
  headline: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  wrapperClass?: string;
  headlineClass?: string;
  inputClass?: string;
};

type InputProps =
  | InputCheckBoxProps
  | InputTextProps
  | InputDateProps
  | InputReadOnlyTextProps
  | InputNumberProps
  | InputTextAreaProps
  | InputTimeProps;

const Input = (props: InputProps) => {
  if (props.type === "text") {
    const {
      headline,
      name,
      wrapperClass,
      headlineClass,
      inputClass,
      onChange,
      value,
    } = props;
    return (
      <div
        className={`flex justify-between flex-wrap w-full text-black dark:text-white ${wrapperClass}`}
      >
        <h3 className={`font-bold ${headlineClass}`}>{headline}:</h3>
        <input
          type="text"
          name={name}
          value={value}
          className={`px-2 border-[1px] border-solid border-black dark:border-white dark:text-white rounded-sm bg-light-bg dark:bg-dark-bg ${inputClass}`}
          onChange={onChange}
        />
      </div>
    );
  }

  if (props.type === "textarea") {
    const { headline, name, value, onChange, placeHolder } = props;
    return (
      <div className="flex flex-col gap-2 text-black dark:text-white">
        <h3 className="font-bold">{headline}:</h3>
        <textarea
          name={name}
          placeholder={placeHolder === "" ? "No comment" : ""}
          onChange={onChange}
          className="border-[1px] border-solid border-black dark:border-white dark:text-white rounded-sm bg-light-bg dark:bg-dark-bg"
        >
          {value}
        </textarea>
      </div>
    );
  }

  if (props.type === "readOnly") {
    const { headline, value, wrapperClass, headlineClass, inputClass } = props;
    return (
      <div
        className={`flex justify-between flex-wrap w-[10rem] text-black dark:text-white ${wrapperClass}`}
      >
        <h3 className={`font-bold ${headlineClass}`}>{headline}:</h3>
        <p
          className={`px-2 border-[1px] border-solid border-black dark:border-white dark:text-white rounded-sm bg-light-bg dark:bg-dark-bg ${inputClass}`}
        >
          {value}
        </p>
      </div>
    );
  }

  if (props.type === "checkbox") {
    const { headline, isChecked, name, onClick, headlineClass, wrapperClass } =
      props;
    return (
      <div
        className={`flex justify-between w-full text-black dark:text-white ${wrapperClass}`}
      >
        <h3 className={`font-bold ${headlineClass}`}>{headline}:</h3>
        <input
          type="checkbox"
          name={name}
          checked={isChecked}
          onClick={onClick}
        />
      </div>
    );
  }

  if (props.type === "date") {
    const {
      value,
      headline,
      name,
      headlineClass,
      inputClass,
      wrapperClass,
      onChange,
    } = props;
    return (
      <div
        className={`flex w-[11rem] justify-between  text-black dark:text-white ${wrapperClass}`}
      >
        <h3 className={`font-bold ${headlineClass}`}>{headline}:</h3>
        <input
          name={name}
          type="date"
          value={value}
          className={`w-[8rem] px-2 border-[1px] border-solid border-black dark:border-white dark:text-white rounded-sm bg-light-bg dark:bg-dark-bg ${inputClass}`}
          onChange={onChange}
        />
      </div>
    );
  }

  if (props.type === "time") {
    const {
      value,
      headline,
      name,
      headlineClass,
      inputClass,
      wrapperClass,
      onChange,
    } = props;

    return (
      <div
        className={`flex justify-between w-[13rem] text-black dark:text-white ${wrapperClass}`}
      >
        <h3 className={`font-bold ${headlineClass}`}>{headline}:</h3>
        <input
          name={name}
          type="time"
          value={value}
          className={`w-[8rem] px-2 border-[1px] border-solid border-black dark:border-white dark:text-white rounded-sm bg-light-bg dark:bg-dark-bg ${inputClass}`}
          onChange={onChange}
        />
      </div>
    );
  }

  if (props.type === "number") {
    const {
      headline,
      name,
      value,
      headlineClass,
      inputClass,
      min,
      max,
      wrapperClass,
    } = props;
    return (
      <div
        className={`flex justify-between flex-wrap w-[8rem] text-black dark:text-white ${wrapperClass}`}
      >
        <h3 className={`font-bold ${headlineClass}`}>{headline}:</h3>
        <input
          type="number"
          name={name}
          min={min}
          max={max}
          value={value ?? 0}
          className="pl-2 border-[1px] border-solid border-black dark:border-white dark:text-white rounded-sm bg-light-bg dark:bg-dark-bg"
        />
      </div>
    );
  }
};

export default Input;
