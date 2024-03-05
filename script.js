//ตัวแปร Boss789/เงินทอน/3 EDITINFO Richmenu
const urlAPI ="https://script.google.com/macros/s/AKfycbzJqeUuPjA9ethuRBoxaIr4Rgg945zpNDjc_R218h-nGYbNH3u-Ca8Hr5mveKCCmqwJ/exec";
let uid,uname,picture,xos,emailL

$(document).ready(function () {
 
    const liffId = "2001097905-WGBQ6weJ";    // Liff Id เงินทอน/EditInfo  2001097905-WGBQ6weJ
    initializeLiff(liffId);
    

    // $("#picdata").attr("src","https://cdn-icons-png.flaticon.com/512/3177/3177440.png")
})
function initializeLiff(liffId) {
    liff
        .init({
            liffId: liffId ,withLoginOnExternalBrowser: true
        })
        .then(() => {

            if (!liff.isInClient() && !liff.isLoggedIn()) {
                window.alert("กรุณาเข้าสู่ระบบบัญชี LINE ของคุณ");
                liff.login({redirectUri: location.href});
                        
            }
            liff.getProfile().then(async function (profile) {
                // console.log(profile)
                uid = profile.userId;
                uname = profile.displayName;
                picture = profile.pictureUrl;
                xos = liff.getOS();
                emailL = liff.getDecodedIDToken().email;    
                await reloadData(uid)            
            })
         
            
        })
        .catch((err) => {
            console.log('LIFF Initialization failed ', err);
        });
}

// สำหรับ upload รูปขึ้นระบบ
let imgupload = document.getElementById('file_image');
imgupload.addEventListener('change', function (e) {
    $('#imgbox').show()
    if (e.target.files[0]) {
      document.getElementById('picdata').style.display = 'block'
        let imageVal = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement("img");
            img.onload = function (event) {
                // This line is dynamically creating a canvas element
                const canvas = document.createElement("canvas");
             
                let ctx = canvas.getContext("2d");
                    canvas.width=150
                    canvas.height=150
                    ctx.drawImage(img, 0, 0, 150, 150);
                    // ctx.drawImage(img, 0, 0, 170, 200);


                    
                let url = canvas.toDataURL(imageVal.type);
                // console.log(url)
                document.getElementById("picdata").src = url;
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(imageVal);
    }else{
      document.getElementById("picdata").src = "";
    }
});
//ตรวจสอบขนาดไฟล์อัพโหลดและแสดงรูปภาพ อ.รองหลวง
function fileValidation(){
    // $('#picdata').show()
//    var fileInput = document.getElementById('file_upload');
   var fileInput = document.querySelector("#file_image");
//    console.log(fileInput)
   var filePath = fileInput.value;
//    console.log(filePath)
   var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

   var iConvert = (fileInput.files[0].size/(1024*1024)).toFixed(2);
   let txt = "ขนาดไฟล์: " + iConvert + " MB <br/>";
   $("#file_input_help").html("")
    if(fileInput.files[0].size > 2 * 1048576){
     Swal.fire({
     position: 'top',
     icon: 'info',
     title: 'คำเตือน !',
     text: 'ขนาดไฟล์ต้องไม่เกิน 2 mb',
     confirmButtonColor: '#000',
     confirmButtonText: 'ตกลง!'
   })
   fileInput.value = ''
    }else{  
   if(!allowedExtensions.exec(filePath)){
      Swal.fire({
         position: 'top',
         icon: 'error',
         title: 'กรุณาแนบไฟล์ภาพเท่านั้น!!',
         showConfirmButton: false,
         timer: 1500
       })
       fileInput.value = '';
       return false;
   }
   else{
    $("#file_input_help").html(txt)
     //Image preview
      //  if (fileInput.files && fileInput.files[0]) {
      //      var reader = new FileReader();
      //      reader.onload = function(e) {
      //       //    document.getElementById('picdata').src = e.target.result
      //        };
      //      reader.readAsDataURL(fileInput.files[0]);
      //      console.log(fileInput.files[0])
       //}
   }     
 }
}



  (function () {
    "use strict";
  
    var forms = document.querySelectorAll(".needs-validation");
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            showError("โปรดกรอกข้อมูลให้ครบ");
          }
  
          form.classList.add("was-validated");
        },
        false
      );
    });
  })();
  /** ฟังก์ชั่นแสดงข้อความเมื่อ Error (ใช้ SweetAlert2) */
  function showError(e) {
    Swal.fire({
      title: e,
      icon: "warning",
      // timer: 1500,
      confirmButtonText: "ตกลง",
    });
  }

