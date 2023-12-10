import * as yup from "yup";

export const userRegisterValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name required.")
    .matches(
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
      "Please enter a valid name!"
    ),
  username: yup
    .string()
    .required("username required."),
  phone: yup
    .string()
    .required("Phone number required.")
    .matches(/^\d{10}$/, "Please enter a valid phone number!"),
  password: yup
    .string()
    .required("Password required.")
    .min(6, "Password requires at least 6 letters!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password doesn't match!"),
});

export const userLoginValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required("username required."),
  password: yup
    .string()
    .required("Password required.")
    .min(6, "Password requires at least 6 letters!"),
});


