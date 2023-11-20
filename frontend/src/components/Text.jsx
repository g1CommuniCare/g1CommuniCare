import React from "react";

const sizeClasses = {
  txtArchivoRomanBold24: "font-archivo font-bold",
  txtRobotoSerifNormalRomanMedium20: "font-medium font-robotoserif",
  txtRobotoSerifRegular21: "font-normal font-robotoserif",
  txtRobotoSerifRegular20: "font-normal font-robotoserif",
  txtLibreFranklinRomanExtraBold44: "font-extrabold font-librefranklin",
  txtLibreFranklinRomanExtraBold40: "font-extrabold font-librefranklin",
  txtRobotoSerifRegular22: "font-normal font-robotoserif",
  txtLibreFranklinRomanExtraBold28: "font-extrabold font-librefranklin",
  txtLibreFranklinRomanExtraBold111: "font-extrabold font-librefranklin",
  txtLibreFranklinRomanBold64: "font-bold font-librefranklin",
  txtLibreFranklinRomanExtraBold48: "font-extrabold font-librefranklin",
  txtLibreFranklinRomanBold96: "font-bold font-librefranklin",
  txtRobotoRomanRegular12: "font-normal font-roboto",
  txtLibreFranklinRomanBlack48: "font-black font-librefranklin",
  txtRobotoMedium16: "font-medium font-roboto",
  txtRobotoMedium16Bluegray900: "font-medium font-roboto",
};

const Text = ({ children, className = "", size, as, ...restProps }) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
