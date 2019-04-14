// $(function () {
    $('input[name="radio2"]').click(function () {
        //alert(this.checked);
        //

        var domName = $(this).attr('name');

        var $radio = $(this);
        // if this was previously checked
        if ($radio.data('waschecked') == true) {
            $radio.prop('checked', false);
            var inputs = document.querySelectorAll(".t1");//获取所有的input标签对象  
            var IdList;
            var checkboxArray = [];//初始化空数组，用来存放checkbox对象。
            for (var i = 0; i < inputs.length; i++) {
                var obj = inputs[i];
                if (obj.type == 'checkbox') {
                    obj.checked = false;
                }
            }
            $("input:radio[name='" + domName + "']").data('waschecked', false);
            //$radio.data('waschecked', false);
        } else {
            $radio.prop('checked', true);
            var inputs = document.querySelectorAll(".t1");//获取所有的input标签对象  
            var IdList;
            var checkboxArray = [];//初始化空数组，用来存放checkbox对象。
            for (var i = 0; i < inputs.length; i++) {
                var obj = inputs[i];
                if (obj.type == 'checkbox') {
                    obj.checked = true
                }
            }
            $("input:radio[name='" + domName + "']").data('waschecked', false);
            $radio.data('waschecked', true);
        }
    });


