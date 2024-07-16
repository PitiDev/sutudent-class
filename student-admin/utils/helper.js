const clearFormData = async (form, self) => {
  Object.keys(form).forEach(function (key, index) {
    self.form[key] = "";
  });
};

export { clearFormData };
