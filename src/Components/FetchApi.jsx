const apiBaseUri = "https://localhost:7047/";  

export default async function FetchAPI(uri, method, bodyModel) {
  try {
  if (method.toLowerCase() == "get") {
    try {
        //GET
        const data = await fetch(apiBaseUri + uri, {
          method: method,
          mode: "cors",
          cache: "no-cache",
          headers: {"Content-Type": "application/json"}
        })
          .then(async (response) => {
            let result = await response.text().then((text) => {
              return text ? JSON.parse(text) : null; //Body içinde JSON var mı yoksa null ver.
            });

            if (response.status === 200) {
              //OK
              return { status: 200, result: result }; //burada result backend de olan datalar ok olduğunu söyluyor.
            } else {
              //Diğer Status kod durumları
              if (result != null) {
                //sonuç null değil ama başarılı de değil(200 dışında olan kodlar)

              }
              return { status: response.status, result: result };
            }
          })
          .catch(() => {
            return { status: 500, result: null };
          });
        return data;
    } catch (e) {
      return { status: 500, result: null };
  }}
  else{
    // POST
     const data = await fetch(apiBaseUri + uri, {
      method: method,
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyModel),
    })
      .then(async (response) => {
        let result = await response.text().then((text) => {
          return text ? JSON.parse(text) : null; // Body is JSON or NULL
        });

        if (response.status === 200) {
          return { status: 200, result: result };
        } 
        else {
          if (result != null) {
            // Toast.fire({
            //   icon: "error",
            //   title: result.message,
            // });
          }
          return { status: response.status, result: result };
        }
      })
        .catch(() => {
          return { status: 500, result: null };
        });
      return data;
      }
    }
    catch (e)
    {
      return { status: 500, result: null };
    }
  }




// const [readers, setReaders] = useState([]);

//   useEffect(() => {
//     async function fetchReaders() {
//       try {
//         const response = await fetch('https://localhost:7047/Reader/List', {
//         method:"GET",    
//         mode: "cors", // CORS hatasını önlemek için no-cors modu
//         cache: "no-cache",
//         headers: {"Content-Type": "application/json",},  
//         });
//         if (!response.ok) {
//         throw new Error('HTTP error, status = ' + response.status);
//          }
//         const data = await response.json();
//         console.log(data)
//         setReaders(data);
//       } catch (error) {
//         console.log('API\'den veri alınamadı:'+ error.fetch, error);
//       }
//     }
//     fetchReaders();
//   }, []);
