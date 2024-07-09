
function modal(){
    let modal = document.createElement('div');
     modal.id = 'proofGenerationModal';
     modal.style.display = 'none';
     modal.style.position = 'fixed';
     modal.style.zIndex = '1';
     modal.style.paddingTop = '100px';
     modal.style.left = '0';
     modal.style.top = '0';
     modal.style.width = '100%';
     modal.style.height = '100%';
     modal.style.overflow = 'auto';
     modal.style.backgroundColor = 'rgb(0,0,0)';
     modal.style.backgroundColor = 'rgba(0,0,0,0.4)';
     modal.innerHTML = '<div style="background-color: #fefefe; margin: auto; padding: 20px; border: 1px solid #888; width: 80%;"><h3 style="text-align: center; padding-bottom: 20px">Fetching your order details...</h3><p style="text-align: center;">Please wait while we fetch your order details.</p></div>'
     document.body.appendChild(modal);
     document.getElementById('proofGenerationModal').style.display = 'block';
   }
   
   
   async function fetchAllOrders(email, csrf) {
     try{
     const baseUrl = 'https://www.nykaa.com/fe-api/omsApis/v1/orderList';
     let currentPage = 0;
     const offset = 10; // Fixed offset
     let orders = [];
     let hasMoreOrders = true;
   
     while (hasMoreOrders) {
         // Define the query parameters
         const params = {
             currentPage: currentPage.toString(),
             offset: offset.toString(),
             email: email || '',
             domain: 'NYKAA'
         };
   
         // Create the URL object
         const url = new URL(baseUrl);
         // Append the query parameters to the URL
         url.search = new URLSearchParams(params).toString();
   
         // Define the fetch options
         const options = {
             method: 'GET',
             headers: {
                 'accept': 'application/json',
                 'accept-language': 'en-US,en;q=0.9',
                 'priority': 'u=1, i',
                 'sec-fetch-dest': 'empty',
                 'sec-fetch-mode': 'cors',
                 'sec-fetch-site': 'same-origin',
                 'x-csrf-token': csrf
             },
             referrer: 'https://www.nykaa.com/sales/order/history/v2?ptype=myOrder',
             referrerPolicy: 'strict-origin-when-cross-origin',
             body: null,
             mode: 'cors',
             credentials: 'include'
         };
   
         try {
             const res = await fetch(url, options);
             const response = await res.json();
   
             if (response.success && response.data.orderList.length > 0) {
               let resultsData = response?.data?.orderList?.flatMap(order => 
                 order?.shipmentDetail?.flatMap(shipment => 
                   shipment?.itemList?.map(item => ({
                     itemSku: item?.productId,
                     itemStatus: item?.itemStatus,
                     itemName: item?.itemName,
                     imageUrl: item?.imageUrl,
                     itemQuantity: item?.itemQuantity,
                     itemMrp: item?.itemMrp,
                     productUrl: item?.productUrl,
                     brandNames: item?.brandNames,
                     categoryId: item?.categoryId,
                     orderNo: order?.orderNo,
                     createdAt: order?.createdAt,
                   }))
                 )
               );
   
   
                 // Append fetched orders to the orders array
                 orders = [...orders, ...resultsData];
                 // Increment the currentPage for the next fetch
                 currentPage++;
             } else {
                 // If no more orders are found, exit the loop
                 hasMoreOrders = false;
             }
         } catch (error) {
             console.error('Fetch error:', error);
             hasMoreOrders = false; // Exit loop on error
         }
     }
   
     return orders;
   } catch (error) {
     console.error('Error in fetchAllOrders:', error);
     return [];
   }
   }
   
   async function fetchNykaaData() {
     try {
       // Check if the current URL includes the specific path
       if (
         window.location.href.includes(
           "https://www.nykaa.com/sales/order/history/v2?ptype=myOrder"
         )
       ) {
         console.log("URL condition met");
         // Get localStorage data
         const localStorageData = window.localStorage.getItem("REACT_CONFIG");
         if (localStorageData === null) {
           console.log("No data found in localStorage");
           return;
         }
   
         // Extract email and csrf token from localStorage data
         let email = "";
         let csrf = "";
         try {
           const parse = JSON.parse(localStorageData);
           email = parse.data.result.customerData.loginEmail;
           csrf = parse.data.result.form_key;
         } catch (parseError) {
           console.error("Error parsing localStorage data:", parseError);
           return;
         }
         let orders = await fetchAllOrders(email, csrf)
         orders = orders?.length > 50 ? orders.slice(0, 50) : orders;
         console.log("Orders:", orders);
         // Post message to React Native WebView and redirect to Prive page (to trigger the proof generation)
         window.ReactNativeWebView.postMessage(JSON.stringify({ publicData: orders }));
         window.location.href = 'https://www.nykaa.com/prive';
       }
     } catch (error) {
       console.error("There has been a problem with your fetch operation:", error);
     }
   }
   
   // Function to call the async function at intervals
   function fetchDataInterval() {
     fetchNykaaData().catch((error) =>
       console.error("Error in fetchDataInterval:", error)
     );
   }
   
   function checkRoute() {
     try{
       const localStorageData = window.localStorage.getItem("REACT_CONFIG"); 
       if (
         window.location.href.includes(
           "https://www.nykaa.com/sales/order/history/v2?ptype=myOrder"
         ) && localStorageData !== null
       ){
         if(document.getElementById('proofGenerationModal')){
          return 
         }
         // check if the modal is already present 
         document.getElementById('proofGenerationModal') ? null :
         modal();
         
       }
     }
     catch (error) {
       console.error('Error in checkRoute:', error);
     }
   }
   
   // Call the function at intervals
   setInterval(checkRoute, 200);
   
   setInterval(fetchDataInterval, 2500);