export default (context, inject) => {
  const asking = async (props, id, nextFunction) => {
    try {
      await props.$toast.info("Do you want to delete?", {
        duration: 10000,
        keepOnHover: true,
        icon: "fa-question-circle",
        action: [
          {
            text: "Yes",
            onClick: async (e, toastObject) => {
              await toastObject.goAway(0);
              await nextFunction(id);
            },
          },
          {
            text: "Cancel",
            onClick: async (e, toastObject) => {
              await toastObject.goAway(0);
            },
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };
  inject("asking", asking);
  context.$asking = asking;
};
