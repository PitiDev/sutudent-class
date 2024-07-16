import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
const login = {
  data() {
    return {
      user_nameErrors: "",
      passwordErrors: "",
    };
  },
  validations: {
    form: {
      user_name: {
        required,
      },
      password: {
        required,
      },
    },
  },
  computed: {
    user_nameError() {
      const errors = [];
      if (!this.$v.form.user_name.$dirty) return errors;
      this.user_nameErrors = "";
      !this.$v.form.user_name.required &&
        errors.push("Please enter your Username");
      return errors;
    },
    passwordError() {
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;
      this.passwordErrors = "";
      !this.$v.form.password.required &&
        errors.push("Please enter your password");
      return errors;
    },
  },
};

const register = {
  data() {
    return {
      showPassword: false,
      showConfirmPassword: false,
      errorValues: {},
      errorFields: [
        "first_name",
        "email",
        "phone",
        "provider",
        "password",
        "status",
        "confirm_password",
      ],
      firstNameError: "",
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
      form: {
        first_name: "vonkgeo",
        email: "vonkgeo@gmail.com",
        phone: "28492947",
        provider: "local",
        password: "28492947",
        confirm_password: "28492947",
      },
    };
  },
  validations: {
    form: {
      first_name: {
        required,
      },
      email: {
        email,
        required,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      confirm_password: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
  },
  computed: {
    firstNameErrors() {
      const errors = [];
      if (!this.$v.form.first_name.$dirty) return errors;
      this.firstNameError = "";
      !this.$v.form.first_name.required &&
        errors.push("Please enter your first name");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      this.emailError = "";
      !this.$v.form.email.required && errors.push("Please enter your email");
      !this.$v.form.email.email && errors.push("Must be valid e-mail");
      return errors;
    },

    passwordErrors() {
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;
      this.passwordError = "";
      !this.$v.form.password.required &&
        errors.push("Please enter your password");
      !this.$v.form.password.minLength &&
        errors.push("Password must be at least 6 characters");
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.form.confirm_password.$dirty) return errors;
      this.confirmPasswordError = "";
      !this.$v.form.confirm_password.required &&
        errors.push("Please enter your confirm_password");
      !this.$v.form.confirm_password.sameAsPassword &&
        errors.push("Passwords must match");
      return errors;
    },
  },
};

export { login, register };
