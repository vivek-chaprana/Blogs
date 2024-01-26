import { cn } from "clsx-tailwind-merge";

interface Props {
    passStrength: number;
}

const PasswordStrength = ({ passStrength }: Props) => {
    return (
        <div
            className={cn(" col-span-2 flex gap-2", {
                "justify-around": passStrength === 3,
                "justify-start": passStrength < 3,
            })}
        >
            {/* {Array.from({ length: passStrength + 1 }).map((i, index) => (
                <div
                    key={index}
                    className={cn("h-2 w-32 rounded-md", {
                        "bg-red-500": passStrength === 0,
                        "bg-orange-500": passStrength === 1,
                        "bg-yellow-500": passStrength === 2,
                        "bg-green-500": passStrength === 3,
                    })}
                ></div>
            ))} */}

            <div className={cn("h-1 w-full scale-x-0 rounded-md origin-left transition-all ", {
                "bg-red-500 scale-x-[.25]": passStrength === 0,
                "bg-orange-500 scale-x-50": passStrength === 1,
                "bg-yellow-500 scale-x-75": passStrength === 2,
                "bg-green-500 scale-x-100": passStrength === 3,
            })}>
            </div>
        </div>
    );
};

export default PasswordStrength;