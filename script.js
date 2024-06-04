  let url = "http://192.168.0.105:3000";

  window.onload = () => {
    connectSocket();
  };

  const socket = io(url, {
    transports: ["websocket"],
    withCredentials: false,
    extraHeaders: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });

  socket.on("connect", () => {
    console.log("Socket conectado:", socket);
  });

  socket.on("disconnect", () => {
    console.log("Socket desconectado");
  });

  function client() {
    window.location.href = "index.html";
  }

  function logs() {
    window.location.href = "logs.html";
  }

  function clearText(element) {
    if (
      element.value === "correo electronico" ||
      element.value === "Ingrese la palabra clave"
    ) {
      element.value = "";
    }
  }

  function submitForm() {
      var email = document.getElementById("emailBox").value.trim();
      var keyword = document.getElementById("keywordBox").value.trim();
    
      if (keyword === "") {
        alert("Por favor, ingrese una palabra clave.");
        return;
      }
    
      if (email === "" || email === "correo electronico" || keyword === "Ingrese la palabra clave") {
        alert("Por favor, complete todos los campos.");
        return;
      }
    
      fetch(`${url}/scraping?keyword=${keyword}&email=${email}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then((data) => {
          alert(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Hubo un error al realizar la solicitud.");
        });
    }


    function connectSocket() {
      socket.on("newLog", (logMessage) => {
        const logList = document.getElementById("logList");
        const logItem = document.createElement("li");
        logItem.textContent = logMessage;
        logItem.classList.add("log-entry");
        logList.appendChild(logItem);
      });
    }

    function reddis() {

      console.log("dskc");
      const card = document.getElementById("popularQueriesCard");
      if (card.style.display === "none") {
        card.style.display = "block"; 
      } else {
        card.style.display = "none"; 
      }
    }
    

    function addQueueRow(queueName, processCount, status) {
      const tableBody = document.querySelector('#queueTable tbody');
      const newRow = document.createElement('tr');
    
      // Crear y añadir celdas para Cola, N° de Procesos y Estado
      newRow.innerHTML = `
        <td>${queueName}</td>
        <td>${processCount}</td>
        <td>${status}</td>
      `;
    
      tableBody.appendChild(newRow);
    }
    
    