import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Banner } from "./banner";

export const SignUpForm = () => {
  const validationSchema = yup.object().shape({
    firstName: yup.string().required("First Name cannot be empty"),
    lastName: yup.string().required("Last Name cannot be empty"),
    email: yup
      .string()
      .required("Looks like this is not an email")
      .email("this email address is invalid"),
    password: yup.string().required("Password cannot be empty"),
  });

  // get functions to build form with useForm() hook
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState as any;

  function onSubmit(data: any) {
    alert("Thanks for signing up! You will receive an email shortly.");
    return false;
  }

  return (
    <>
      <div className="px-10 sm:px-20">
        <Banner />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded-lg px-8 pt-14 pb-8 mb-4 mt-4"
        >
          <div className="mb-4 relative">
            <label className="sr-only" htmlFor="firstname">
              First Name
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-4 px-4 
                          font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                           ${errors.firstName ? "is-invalid" : ""}`}
              id="firstname"
              type="text"
              {...register("firstName")}
              placeholder={errors.firstName ? "" : "First Name"}
              autoComplete="given-name"
            />
            <div
              id="firstNameErrorMessage"
              aria-live="polite"
              className="text-red-500 text-xs italic text-right font-bold"
            >
              {errors.firstName?.message}
            </div>
          </div>
          <div className="relative mb-4">
            <label className="sr-only" htmlFor="lastname">
              Last Name
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-4 px-4 
              font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
               ${errors.lastName ? "is-invalid" : ""}`}
              id="lastname"
              type="text"
              {...register("lastName")}
              placeholder={errors.lastName ? "" : "Last Name"}
              autoComplete="family-name"
            />
            <div
              aria-live="polite"
              className="text-red-500 text-xs italic text-right font-bold"
            >
              {errors.lastName?.message}
            </div>
          </div>
          <div className="relative mb-4">
            <label className="sr-only" htmlFor="emailaddress">
              Email Address
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-4 px-4 
              font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
               ${errors.email ? "is-invalid" : ""}`}
              id="emailaddress"
              type="email"
              {...register("email")}
              placeholder={errors.email ? "email@example/com" : "Email Address"}
              autoComplete="email"
            />
            <div className="text-red-500 text-xs italic text-right font-bold">
              {errors.email?.message}
            </div>
          </div>
          <div className="mb-6 relative">
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-4 px-4 
              font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
               ${errors.password ? "is-invalid" : ""}`}
              id="password"
              type="password"
              {...register("password")}
              placeholder={errors.password ? "" : "Password"}
            />
            <div
              aria-live="polite"
              className="text-red-500 text-xs italic text-right font-bold"
            >
              {errors.password?.message}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              aria-describedby="termsAndConditions"
              className="bg-green-700 hover:bg-green-300 text-white text-sm font-bold p-4 w-full rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              CLAIM YOUR FREE TRIAL
            </button>
          </div>
          <p
            id="termsAndConditions"
            className="text-sm mb-4 text-center pt-4 text-gray-700"
          >
            By clicking the button, you are agreeing to our{" "}
            <a href="#" className="font-bold text-red-700">
              Terms and Services
            </a>
          </p>
        </form>
      </div>
    </>
  );
};
export default SignUpForm;