window.addEventListener('DOMContentLoaded', (event) => {
    var url = window.location.toString();

    function GetURLParameter(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return decodeURIComponent(sParameterName[1]);
            }
        }
    }

    var pair_option_value = [];
    var get_product_id = '';

    /* check type is radio */
    if ($("[id^='list-product__option--radio']").length > 0) {

        /*check add variant default list*/
        if ($("[id^='single-product-option']").length == 0) {
            $("[id^='list-product__option--radio']").each(function(e, v) {
                if (pair_option_value[$(v).data("product-id")] == undefined) {
                    pair_option_value[$(v).data("product-id")] = [];
                    pair_option_value[$(v).data("product-id")][$(this).data("id")] = $(v).find("input:checked").val();
                } else {
                    pair_option_value[$(v).data("product-id")][$(this).data("id")] = $(v).find("input:checked").val();
                }
            });

            /*check one change product option*/
            $("[id^='list-product__option--radio']").on('change', function() {
                pair_option_value[$(this).data("product-id")][$(this).data("id")] = $(this).find("input:checked").val();
                get_product_id = $(this).data("product-id");
                getProductOption();
            });
        }

        /*check add variant default single*/
        if ($("[id^='single-product-option']").length > 0) {
            $("[id^='list-product__option--radio']").each(function(e, v) {
                pair_option_value[$(this).data("id")] = $(v).find("input:checked").val();
            });

            /*check one change product option*/
            $("[id^='list-product__option--radio']").on('change', function() {
                pair_option_value[$(this).data("id")] = $(this).find("input:checked").val();
                get_product_id = $(this).data("product-id");
                getProductOption();
            });
        }
    }
    /*end*/

    /* check type is select*/
    if ($("[id^='list-product__option--select']").length > 0) {

        /*check add variant default list*/
        if ($("[id^='single-product-option']").length == 0) {
            $("[id^='list-product__option--select']").each(function(e, v) {
                if (pair_option_value[$(v).data("product-id")] == undefined) {
                    pair_option_value[$(v).data("product-id")] = [];
                    pair_option_value[$(v).data("product-id")][$(this).data("id")] = $(v).val();
                } else {
                    pair_option_value[$(v).data("product-id")][$(this).data("id")] = $(v).val();
                }
            });

            /*check one change product option*/
            $("[id^='list-product__option--select']").on('change', function() {
                pair_option_value[$(this).data("product-id")][$(this).data("id")] = $(this).val();
                get_product_id = $(this).data("product-id");
                getProductOption();
            });
        }
        /*end*/

        /*check add variant default single*/
        if ($("[id^='single-product-option']").length > 0) {
            $("[id^='list-product__option--select']").each(function(e, v) {
                pair_option_value.push($(v).val());
            });

            /*check one change product option*/
            $("[id^='list-product__option--select']").on('change', function() {
                pair_option_value[$(this).data("id")] = $(this).val();
                getProductOption();
            });
        }
        /*end*/

    }
    /*end*/

    /* check tick icon */
    $("[id^='list-product__option--radio']").each(function(element, value) {
        var block = $(this).attr('data-id', element);
        $(block).find('.product-option-radio').each(function(e, v) {
            $(v).click(function() {
                block.find('.tick_icon').removeClass('active');
                $(this).find('.tick_icon').addClass('active');
            });
        });
    });
    /*End*/

    if (!jQuery.isEmptyObject(pair_option_value)) {
        getProductOption();
    }

    function getProductOption() {

        if ($("[id^='single-product-option']").length > 0) {

            /*single product*/
            var data_product_options = $('#single-product-option').text();
            var variant_pair = pair_option_value.filter(Boolean).join('-');
        }

        /*list product*/
        if (get_product_id != '' && $("[id^='single-product-option']").length == 0) {
            var data_product_options = $('#data-product-option-' + get_product_id).text();
            var variant_pair = pair_option_value[get_product_id].join('-');

        }

        if (data_product_options == undefined || data_product_options == '') {
            return false;
        }

        data_product_options = JSON.parse(data_product_options);

        /* var url_cart = $('.cart_product_option_id_'+get_product_id).val();*/
        /* ex_url_cart = url_cart.split('?product_id=');*/


        /*check isset product variant*/
        if (typeof(data_product_options[variant_pair]) != "undefined" && data_product_options[variant_pair] !== null) {

            /*check add product detail*/
            if ($("[id^='single-product-option']").length > 0) {
                if (!jQuery.isEmptyObject(data_product_options[variant_pair]['special']) && data_product_options[variant_pair]['special'].price != '') {
                    $('.zw-price').text(data_product_options[variant_pair]['special'].price);
                    $('.zw-old-price').text(data_product_options[variant_pair].price);
                    $('.zw-discount-percent').text('(' + data_product_options[variant_pair]['special'].discount_percent + '%)');
                } else {
                    $('.zw-price').text(data_product_options[variant_pair].price);
                }

                if ($('.box-option-text').length > 0) {
                    $('.box-option-text:first()').empty();

                    options_text = Object.values(data_product_options[variant_pair].options)
                    $(options_text).each(function(i, v) {
                        if (v.type == 'text') {
                            option_text_html = `<label class="control-label" for="input-option` + v.product_option_id + `">
              ` + v.name + `
              </label><input type="text" name="option[` + v.product_option_id + `]"
              value="` + v.value + `" placeholder="` + v.name + `"
              id="input-option` + v.product_option_id + `" class="form-control" />`;
                            $('.box-option-text:first()').append(option_text_html);
                        }
                    });
                }

                /*add data in class*/
                $('.product-variant-model').text(data_product_options[variant_pair].model);
                $('.product-option-id').val(data_product_options[variant_pair].product_id);
                $(".zw-href-default").attr("href", data_product_options[variant_pair].popup);
                $('.zw-images-default').attr("src", data_product_options[variant_pair].popup);
            }
            /*End*/

            /*check product list*/
            else {
                if (!jQuery.isEmptyObject(data_product_options[variant_pair]['special']) && data_product_options[variant_pair]['special'].price != '') {
                    $('.zw-price-' + get_product_id).text(data_product_options[variant_pair]['special'].price);
                    $('.zw-old-price-' + get_product_id).text(data_product_options[variant_pair].price);
                    $('.zw-discount-percent-' + get_product_id).text('(' + data_product_options[variant_pair]['special'].discount_percent + '%)');
                } else {
                    $('.zw-price-' + get_product_id).text(data_product_options[variant_pair].price);
                }

                /*add data in class*/
                var url_buy = 'checkout/cart/add?product_id=' + data_product_options[variant_pair].product_id + '&redirect=true';
                $('.url-buy-' + get_product_id).attr("href", url_buy);
                $('.product-option-id-' + get_product_id).val(data_product_options[variant_pair].product_id);
                $('.cart-product-option-id-' + get_product_id).val(data_product_options[variant_pair].product_id);
                $('.zw-image-default-' + get_product_id).attr("src", data_product_options[variant_pair].popup);
            }
            /*End*/
        }

        /* check none product variant*/
        else {
            $('input[name="product_option_id"]').val(null);
            $('input[name="product_id"]').val(null);
        }
        /* end*/
    }

    /*check add to cart*/
    $(".addtocart").click(function() {
        if ($('#data-product-option-' + $(this).data("product-id")).text() != '') {
            var variant_pair = pair_option_value[$(this).data("product-id")];
            for (let i = 0; i < variant_pair.length; i++) {
                if (variant_pair[i] == undefined) {
                    alert('Bạn chưa chọn biến hoặc cặp biến thể phù hợp');
                    return false;
                }
            }
        } else {
            $(this).attr("href", $(this).data("url"));
        }
    });
    /*End*/

    /*check add to wish list*/
    $(".addtowishlist").click(function() {
        if ($('#data-product-option-' + $(this).data("product-id")).text() != '') {
            var variant_pair = pair_option_value[$(this).data("product-id")];
            for (let i = 0; i < variant_pair.length; i++) {
                if (variant_pair[i] == undefined) {
                    alert('Bạn chưa chọn biến hoặc cặp biến thể phù hợp');
                    return false;
                }
            }

            wishlist.add($('.product-option_id-' + $(this).data("product-id")).val());
        } else {
            wishlist.add($('.product-option_id-' + $(this).data("product-id")).val());
        }
    });
    /*End*/

    /*check add to compare link*/
    $(".comparelink").click(function() {
        if ($('#data-product-option-' + $(this).data("product-id")).text() != '') {
            var variant_pair = pair_option_value[$(this).data("product-id")];
            for (let i = 0; i < variant_pair.length; i++) {
                if (variant_pair[i] == undefined) {
                    alert('Bạn chưa chọn biến hoặc cặp biến thể phù hợp');
                    return false;
                }
            }

            compare.add($('.product-option-id-' + $(this).data("product-id")).val());
        } else {
            compare.add($('.product-option-id-' + $(this).data("product-id")).val());
        }
    });
    /*End*/
});