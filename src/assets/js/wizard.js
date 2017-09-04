
$(document).ready(function () {

    //calling on key up validation
   $("#name").keyup(function(){
     var name = $("#name").val();
       if(name == ''){
           $("#name-id").removeClass("hidden");
         }else{
             $("#name-id").addClass("hidden");
         }
    });
     $("#purpose").keyup(function(){
      var purpose = $("#purpose").val();
       if(purpose == ''){
           $("#purpose-id").removeClass("hidden");
         }else{
             $("#purpose-id").addClass("hidden");
         }
    });

     $("#clientele").keyup(function(){
      var clientele = $("#clientele").val();
       if(clientele == ''){
           $("#clientele-id").removeClass("hidden");
         }else{
             $("#clientele-id").addClass("hidden");
         }
    });

   $('#1, #2 ,#3 , #4').change(function(){
            $("#type-id").addClass("hidden")
    });

    $('#5 , #6').change(function(){
      var projectType =  $('input[name=projectType]:checked').val();
      var mobilePlatform = [];
        $(':checkbox:checked').each(function(i){
          mobilePlatform[i] = $(this).val();
        });
     if(projectType == 'MOBILE_ONLY' || projectType == 'WEB_AND_MOBILE'){
      if(mobilePlatform.length == 0){
           $("#mobile-platforms-id").removeClass("hidden")
         }else{
            $("#mobile-platforms-id").addClass("hidden")
         }
      }
    });

$('.input-hidden').hide();
     CKEDITOR.editorConfig = function (config) {
    config.language = 'es';
    config.uiColor = '#F7B42C';
    config.height = 300;
    config.toolbarCanCollapse = true;

};

$( ".sortable_list" ).sortable({

                  connectWith: ".connectedSortable",
                    appendTo: 'div',
                     helper: 'clone',
                    scroll:true
                }).disableSelection();

     var config = {
         removePlugins : 'elementspath',
         extraPlugins:'font',
         extraPlugins: 'htmlwriter',
        height: 300,
        removeButtons: 'Source,UploadFileButton,Image,About',
         toolbar: [
              [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ],
                { name: 'document',	   groups: [ 'mode', 'document' ] },
              { name: 'insert', items: [ 'Image', 'Table', 'HorizontalRule', 'SpecialChar' ] },
              { name: 'basicstyles', items: ['Font','FontSize','Bold' , 'Italic', 'Underline','-','JustifyLeft','JustifyCenter','JustifyRight','-','NumberedList','BulletedList','-','Link','Unlink','-','Source'] },
              { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
              { name: 'styles', items : ['Styles','Format'] },

             ],
        width: '100%'
    };


     // var editor = CKEDITOR.instances.editor; //reference to instance

$('.btn-attachemnet').click(function(){
        $(this).next('.input-hidden').trigger('click')
    })
    var navListItems = $('div.setup-panel div a'),
            allWells = $('.setup-content'),
            allNextBtn = $('.nextBtn'),
            allbackBtn = $('.backBtn'),
            allfinalBtn = $('.finalbutton');

    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
                $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary btn-active-new').addClass('btn-default');
            $item.addClass('btn-primary btn-active-new');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allNextBtn.click(function(){

           var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

          if(curStepBtn === 'step-1'){

              isValid = validateStep1();

             //added by jagasan for destory the ckeditor when filed 3step go back again call the next button then exception throguh allready ck editor are added
              if (CKEDITOR.instances.editor1) {
                  CKEDITOR.instances.editor1.destroy();
             }

            CKEDITOR.replace('editor1',config);
          }else if(curStepBtn === 'step-2'){


            isValid =  validateStep2()
          }
        $(".form-group").removeClass("has-error");
        for(var i=0; i<curInputs.length; i++){
            if (!curInputs[i].validity.valid){
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });


    function validateStep1(){

            var status = true;
            var name = $("#name").val();
            var purpose = $("#purpose").val();
            var clientele = $("#clientele").val()
            var projectType =  $('input[name=projectType]:checked').val();

        var mobilePlatform = [];
        $(':checkbox:checked').each(function(i){
          mobilePlatform[i] = $(this).val();
        });
             if(name == ''){
               $("#name-id").removeClass("hidden");
                   status = false;
             }else{
                 $("#name-id").addClass("hidden");
             } if(clientele == ''){
               $("#clientele-id").removeClass("hidden");
                   status = false;
             }else{
                 $("#clientele-id").addClass("hidden");
             } if(purpose == ''){
               $("#purpose-id").removeClass("hidden");
                   status = false;
             } else{
                 $("#purpose-id").addClass("hidden");
             }


            if(projectType == undefined){
                $("#type-id").removeClass("hidden")
                  status = false;
               }else{
                    $("#type-id").addClass("hidden")
                   if(projectType == 'MOBILE_ONLY' || projectType == 'WEB_AND_MOBILE'){
                      if(mobilePlatform.length == 0){
                           $("#mobile-platforms-id").removeClass("hidden")
                           status = false;
                         }else{
                            $("#mobile-platforms-id").addClass("hidden")
                         }
                    }
               }
        return status;
    }


    function validateStep2(){
      var editor_contents = CKEDITOR.instances["editor1"].getData();

        if(!editor_contents){
            $('#feature-list-id').removeClass('hidden');
            return false;
        }else{
              $('#feature-list-id').addClass('hidden');
              return true;
        }

    }

    allfinalBtn.click(function(){
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;
            console.log(curStep);
        if(curStepBtn == "step-3"){
                $('#preview_requestedform').modal('show');

        }
        $(".form-group").removeClass("has-error");
        for(var i=0; i<curInputs.length; i++){
            if (!curInputs[i].validity.valid){
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });

    allbackBtn.click(function(){
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for(var i=0; i<curInputs.length; i++){
            if (!curInputs[i].validity.valid){
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });

    $('div.setup-panel div a.btn-primary').trigger('click');
});
