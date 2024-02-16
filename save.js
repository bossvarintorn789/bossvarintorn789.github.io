
function getAllElmFormEdit(data) {    
    // ตรวจสอบข้อมูลว่างก่อนบันทึกลงชีต
    const form = document.getElementById("user_form");
    if (!form.checkValidity()) {
      return console.log("form valid check");
    }
    $("#btn_1").hide();
    $("#btn_2").show();
    var obj = {};
    var data = new FormData(); // สร้างออปเจกต์เก็บ
    // กำหนดเงื่อนไขก่อนเก็บข้อมูลให้ยกเว้น submit และ input
    var all = document.querySelectorAll(
      "#user_form input, #user_form select, #user_form textarea"
    );
  
    for (let field of all) {
      if (field.type != "button" && field.type != "submit") {
        /** กำหนดเงื่อนไขค่าที่เป็น type radio */
        if (field.type == "radio" || field.type == "checkbox") {
          if (field.checked) {
            data.append(field.name, field.value);
          }
        } else {
          data.append(field.name, field.value);
        } /** กำหนดเงื่อนไขค่าที่เป็นชนิดอื่นๆ */
      }
    }
    for (let [key, val] of data.entries()) {
console.log(key, val);
      obj[key] = val;
    }
        obj.imageFile = document.getElementById("picdata").src    
console.log(uid)    
        obj.uid = uid
    var formData = JSON.stringify(obj);
console.log(formData)
console.log(JSON.stringify(obj))
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${urlAPI}?action=editDataRegister`,
      headers: {},
      data: formData,
      mode: 'no-cors',
    };
console.log(config)
    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
       const msgResponse = response.data;
          let msg = [
                    {
                      "type": "flex",
                      "altText": "Menu",
                      "contents": {
                        "type": "bubble",
                        "size": "mega",
                        "body": {
                          "type": "box",
                          "layout": "vertical",
                          "contents": [

                            {
                              "type": "box",
                              "layout": "vertical",
                              "contents": [
                                {
                                  "type": "text",
                                  "contents": [
                                    {
                                      "type": "span",
                                      // "text": `ข้อมูลลำดับที่ ${msgResponse.order} แก้ไขเรียบร้อย`,
                                      "text": `ข้อมูลได้รับการแก้ไขเรียบร้อย`,
                                      "weight": "bold",
                                      "color": "#000000",
                                      "size": "md"
                                    }
                                  ],
                                  "size": "sm",
                                  "wrap": true
                                },
                                {
                                  "type": "box",
                                  "layout": "vertical",
                                  "contents": [
                                    {
                                      "type": "box",
                                      "layout": "vertical",
                                      "contents": [
                                        {
                                          "type": "image",
                                          "aspectMode": "cover",
                                          "size": "full",
                                          "url": `${msgResponse.imageUrl}`
                                        }
                                      ],
                                      "cornerRadius": "100px"
                                    }
                                  ],
                                  "width": "100px",
                                  "margin": "md",
                                  "paddingBottom": "md"
                                }
                              ],
                              "margin": "md",
                              "alignItems": "center",
                              "paddingTop": "md"
                            },
                            {
                              "type": "box",
                              "layout": "horizontal",
                              "contents": [
                                {
                                  "type": "box",
                                  "layout": "vertical",
                                  "contents": [
                                    {
                                      "type": "separator",
                                      "color": "#608000",
                                      "margin": "xs"
                                    },
                                    {
                                      "type": "text",
                                      "contents": [
                                        {
                                          "type": "span",
                                          "text": `🆔 : ${msgResponse.mid}`,
                                          "weight": "bold",
                                          "color": "#000000",
                                          "size": "md"
                                        }
                                      ],
                                      "size": "sm",
                                      "wrap": true,
                                      "margin": "lg"
                                    },
                                    {
                                      "type": "text",
                                      "contents": [
                                        {
                                          "type": "span",
                                          "text": `👤 : ${msgResponse.name}`,
                                          "weight": "bold",
                                          "color": "#000000",
                                          "size": "sm"
                                        }
                                      ],
                                      "size": "sm",
                                      "wrap": true
                                    },
                                    {
                                      "type": "text",
                                      "wrap": true,
                                      "size": "sm",
                                      "weight": "regular",
                                      "text": `📧 : ${msgResponse.email}`
                                    },
                                    {
                                      "type": "text",
                                      "text": `🗓️ : ${msgResponse.Timestamp} น.`,
                                      "wrap": true,
                                      "size": "sm",
                                      "weight": "regular"
                                    },
                                    {
                                      "type": "separator",
                                      "margin": "md"
                                    },
                                    {
                                      "type": "button",
                                      "action": {
                                        "type": "uri",
                                        "label": "แก้ไขข้อมูล",
                                        "uri": "https://liff.line.me/2001097905-WGBQ6weJ"
                                      },
                                      "style": "primary",
                                      "gravity": "bottom",
                                      "color": "#55048c"
                                    }
                                  ],
                                  "spacing": "sm"
                                }
                              ],
                              "paddingStart": "20px",
                              "paddingEnd": "20px",
                              "paddingBottom": "10px"
                            }
                          ],
                          "paddingAll": "0px"
                        }
                      }
                    }
                  ]

        if (msgResponse.msg == "SUCCESS") {       
          $("#btn_2").hide();
          $("#btn_1").show();
   
          document.getElementById("user_form").reset();
             document
            .getElementsByClassName("needs-validation")[0]
            .classList.remove("was-validated");
        
          Swal.fire({
            title: 'บันทึกข้อมูล',
            text: "ระบบบันทึกการแก้ไขเรียบร้อย",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            // cancelButtonColor: '#d33',
            confirmButtonText: 'ตกลง'
          }).then(async(result) => {
            if (result.isConfirmed) {      
              await sendMessages(msg);   
            }
          })          
        } else{
            $("#btn_2").hide();
            $("#btn_1").show();
           
            document.getElementById("user_form").reset();
            document
              .getElementsByClassName("needs-validation")[0]
              .classList.remove("was-validated");
              Swal.fire({
                title: 'บันทึกข้อมูลไม่สำเร็จ',
                text: `${msgResponse.msg}`,
                icon: 'error',
                showCancelButton: false,
                confirmButtonColor: '#d33',
                // cancelButtonColor: '#d33',
                confirmButtonText: 'ตกลง'
            }).then((result) => {
              if (result.isConfirmed) {
                liff.closeWindow()
              }
            })
        }
      })
      .catch((error) => {
        console.log(error);
      });
}

async function reloadData(uid) {    
  Swal.fire({
    title: 'กำลังโหลดข้อมูล',
    html: 'กรุณารอสักครู่',
    allowOutsideClick: false,
  })
  Swal.showLoading(Swal.getConfirmButton())
    // ตรวจสอบข้อมูลว่างก่อนบันทึกลงชีต
    const obj = {};
        // console.log(uid)    
        obj.uid = uid
   const formData = JSON.stringify(obj);
      // console.log(formData)
    //   console.log(JSON.stringify(obj))
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${urlAPI}?action=loadDataRegister`,
      headers: {},
      data: formData,
      mode: 'no-cors',
    };
    // console.log(config)
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
       const msgResponse = response.data;
       let datareturn = msgResponse.data.split(",")
        if (msgResponse.msg == "SUCCESS") {   
          
          Swal.fire({
            icon: 'success',
            title: 'เรียบร้อย',
            showConfirmButton: false,
            timer: 1500
          })
          $("#mid").val(datareturn[2]);
          $("#prefix").val(datareturn[3]);
          $("#fname").val(datareturn[4]);
          $("#lname").val(datareturn[5]);
          $("#email").val(datareturn[6]);
          $("#picdata").attr("src",datareturn[9]);
          // Swal.fire({
          //   title: 'บันทึกข้อมูล',
          //   text: "ระบบบันทึกผลการประเมินเรียบร้อย",
          //   icon: 'success',
          //   showCancelButton: false,
          //   confirmButtonColor: '#3085d6',
          //   // cancelButtonColor: '#d33',
          //   confirmButtonText: 'ตกลง'
          // }).then(async(result) => {
          //   if (result.isConfirmed) {      
             
                
          //   }
          // })          
        
        }else{

              Swal.fire({
                title: 'ค้นหาข้อมูมลไม่สำเร็จ',
                text: `${msgResponse.msg}`,
                icon: 'error',
                showCancelButton: false,
                confirmButtonColor: '#d33',
                // cancelButtonColor: '#d33',
                confirmButtonText: 'ตกลง'
            }).then((result) => {
              if (result.isConfirmed) {
                liff.closeWindow()
              }
            })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }


async function sendMessages(text) {
    liff.sendMessages(text).then(function () {
        //หากต้องการส่งทั้ง แบบ message และ sharetargetpicker ให้ปิด liff.closeWindow() ส่วนนี้ไว้ แต่เปิดส่วน share
      liff.closeWindow(); 
    }).catch(function (error) {
        window.alert('Failed to send message ' + error);
    });
}

