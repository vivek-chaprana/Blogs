import { MdCheck } from "react-icons/md";

interface Props {
  password: string;
}

// const PasswordStrength = ({ passStrength: { id } }: Props) => {
//   return (
//     <div
//       className={cn(" col-span-2 flex gap-2", {
//         "justify-around": id === 3,
//         "justify-start": id < 3,
//       })}
//     >
//       {/* {Array.from({ length: id + 1 }).map((i, index) => (
//                 <div
//                     key={index}
//                     className={cn("h-2 w-32 rounded-md", {
//                         "bg-red-500": id === 0,
//                         "bg-orange-500": id === 1,
//                         "bg-yellow-500": id === 2,
//                         "bg-green-500": id === 3,
//                     })}
//                 ></div>
//             ))} */}

//       <div
//         className={cn(
//           "h-1 w-full scale-x-0 rounded-md origin-left transition-all ",
//           {
//             "bg-red-500 scale-x-[.25]": id === 0,
//             "bg-orange-500 scale-x-50": id === 1,
//             "bg-yellow-500 scale-x-75": id === 2,
//             "bg-green-500 scale-x-100": id === 3,
//           }
//         )}
//       ></div>
//     </div>
//   );
// };

const PasswordStrength = ({ password }: Props) => {
  const conditions = [
    {
      label: "Minimum 7 characters long",
      isValid: password?.length >= 7,
    },
    {
      label: "Mix of uppercase & lowercase letters",
      isValid: /(?=.*[a-z])(?=.*[A-Z])/.test(password),
    },
    {
      label: "Contain at least 1 number",
      isValid: /[0-9]/.test(password),
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      {conditions.map(({ label, isValid }) => {
        return (
          <div
            className={`flex items-center gap-2 text-sm transition-colors duration-75  ${
              isValid ? "text-green-500" : "text-b"
            }`}
          >
            {isValid ? (
              <span className="flex justify-center items-center">
                <MdCheck />
              </span>
            ) : (
              <span className="w-[14px] flex items-center justify-center ">
                <div className="w-1 h-1 bg-black rounded-full"></div>
              </span>
            )}
            <span>{label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default PasswordStrength;
