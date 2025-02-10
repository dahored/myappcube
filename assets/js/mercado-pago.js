const mp = new MercadoPago("APP_USR-d75565b8-e84e-42ae-8f29-13d93b756292", {
  locale: "es-CO",
});
const bricksBuilder = mp.bricks();

function createWaller(preferenceId) {
  mp.bricks().create("wallet", "wallet_container", {
    initialization: {
      preferenceId,
    },
    customization: {
      texts: {
        valueProp: "smart_option",
      },
    },
  });
}

const payButton = document.getElementById("pay-button");

payButton.addEventListener("click", function () {
  const preferenceId = document.getElementById("preference_id").value;
  createWaller(preferenceId);
});
