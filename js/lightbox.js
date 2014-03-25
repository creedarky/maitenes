(function () {
    var b, d, c, j;

    b = jQuery;
    j = b('<div id="lb-contact" class="lb-contact col-xs-12 col-sm-8" >' +
          '<h4 class="n-m m-b">Contáctenos</h4>' +
          '<div class="col-xs-12 col-sm-6">' +
          '<div class="form-group required">' +
          '<input type="text" placeholder="Nombre" name="name" id="lb-contact-name" class="form-control" ' +
          'data-validate="^[ا-ي\w\s]{2,30}$" required />' +
          '</div>' +
          '</div>' +
          '<div class="col-xs-12 col-sm-6">' +
          '<div class="form-group required">' +
          '<input type="email" placeholder="Email" name="email" id="lb-contact-email" ' +
          'class="form-control" ' +
          'data-validate="^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$" required />' +
          '</div>' +
          '</div>' +
          '<div class="clearfix"></div>' +
          '<div class="col-xs-12 col-sm-6">' +
          '<div class="form-group required">' +
          '<input type="text" placeholder="Empresa" name="business" id="lb-contact-business" class="form-control" ' +
          'data-validate="^[ا-ي\w\s]{2,30}$" required />' +
          '</div>' +
          '</div>' +

          '<div class="col-xs-12 col-sm-6">' +
          '<div class="form-group required">' +
          '<input type="text" placeholder="Rut Empresa" name="rut" id="lb-contact-rut" class="form-control" ' +
          'data-validate="^[ا-ي\w\s]{2,30}$" required />' +
          '</div>' +
          '</div>' +
          '<div class="clearfix"></div>' +
          '<div class="col-xs-12 col-sm-12">' +
          '<div class="form-group">' +
          '<input type="text" placeholder="Asunto" name="subject" id="lb-contact-subject" class="form-control" required />' +
          '</div></div>' +
          '<div class="col-xs-12 col-sm-12">' +
          '<div class="form-group">' +
          '<textarea placeholder="Mensaje" name="message" id="lb-contact-message" class="form-control" rows="6" data-validate=".{2,400}$" required></textarea>' +
          '</div>' +
          '</div>' +
          '<div class="col-xs-12 col-sm-12">'+
          '<div class="col-xs-6"><button class="btn btn-primary" id="lb_sent_form" >Enviar</button></div>' +
          '<div class="col-xs-6"><button class="btn btn-primary" id="lb_cancel_form" >Cancelar</button></div>' +
          '</div></div>');
    c = (function () {
        function b() {
            this.fadeDuration = 500;
            this.fitImagesInViewport = true;
            this.resizeDuration = 700;
            this.showImageNumberLabel = true;
            this.wrapAround = false
        }

        b.prototype.albumLabel = function (b, c) {
            return"Imagen " + b + " of " + c
        };
        return b
    })();
    d = (function () {
        function c(b) {
            this.options = b;
            this.album = [];
            this.currentImageIndex = void 0;
            this.init()
        }

        c.prototype.init = function () {
            this.enable();
            return this.build()
        };
        c.prototype.enable = function () {
            var c = this;
            return b('body').on('click', 'a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]', function (d) {
                c.start(b(d.currentTarget));
                return false
            })
        };
        c.prototype.build = function () {
            var c = this;
            b("<div id='lightboxOverlay' class='lightboxOverlay'>" +
                "</div><div id='lightbox' class='lightbox'>" +
                "<div class='lb-outerContainer'>" + // container
                "<div  id='lb-container-description' style='display: none;' class='lb-description'>" +
                "<div class='lb-div_description'><p id='lb-description'></p></div>" +
                //"<div class='lb-div_description' id='lb-description'></div>" +
                '<div class="lb-btn"><button id="lb-cotizar" class="btn btn-primary" id="enviar_form_maquinaria" >Cotizar</button></div>' +
                "</div>" + // descripción
                "<div class='lb-container'>" +
                "<img class='lb-image' src='' /><div class='lb-nav'><a class='lb-prev' href='' >" +
                "</a><a class='lb-next' href='' ></a></div>" +
                "<div class='lb-loader'><a class='lb-cancel'></a></div></div></div><div class='lb-dataContainer'><div class='lb-data'><div class='lb-details'><span class='lb-caption'></span><span class='lb-number'></span></div><div class='lb-closeContainer'><a class='lb-close'></a></div></div></div></div>").appendTo(b('body'));
            this.$lightbox = b('#lightbox');
            this.$overlay = b('#lightboxOverlay');
            this.$outerContainer = this.$lightbox.find('.lb-outerContainer');
            this.$outerContainer.prepend(j);
            this.$container = this.$lightbox.find('.lb-container');
            this.containerTopPadding = parseInt(this.$container.css('padding-top'), 10);
            this.containerRightPadding = parseInt(this.$container.css('padding-right'), 10);
            this.containerBottomPadding = parseInt(this.$container.css('padding-bottom'), 10);
            this.containerLeftPadding = parseInt(this.$container.css('padding-left'), 10);
            this.$lbcontact = b("#lb-contact");
            this.$lbcontact.addClass("temp-show");
            this.contactHeight = this.$lbcontact[0].scrollHeight;
            this.$lbcontact.removeClass("temp-show");
            this.$overlay.hide().on('click', function () {
                c.end();
                return false
            });
            this.$lightbox.hide().on('click', function (d) {
                if (b(d.target).attr('id') === 'lightbox') {
                    c.end()
                }
                return false
            });
            this.$outerContainer.on('click', function (d) {
                if (b(d.target).attr('id') === 'lightbox') {
                    c.end()
                }
                return false
            });
            this.$lbcontact.click(function (e,d) {
                e.stopPropagation();
                e.preventDefault();
            });
            b('#lb-cotizar').click(function (e,d) {
                e.stopPropagation();
                e.preventDefault();
                b('#lb-container-description').fadeOut('slow', function() {
                    c.disableKeyboardNav()
                    c.$lbcontact.fadeIn('fast',function() {
                        c.originalHeight = c.$outerContainer.height();
                        if(c.contactHeight > c.originalHeight) {
                            c.$outerContainer.animate({ height: c.contactHeight}, 'fast', 'swing');
                        }
                    });
                });

                return false;
            });
            this.$lightbox.find('.lb-prev').on('click', function () {
                if (c.currentImageIndex === 0) {
                    c.changeImage(c.album.length - 1)
                } else {
                    c.changeImage(c.currentImageIndex - 1)
                }
                return false
            });
            this.$lightbox.find('.lb-next').on('click', function () {
                if (c.currentImageIndex === c.album.length - 1) {
                    c.changeImage(0)
                } else {
                    c.changeImage(c.currentImageIndex + 1)
                }
                return false
            });
            $("#lb_cancel_form" ).on( "click", function() {

                if(c.contactHeight > c.originalHeight) {
                    c.$outerContainer.animate({ height: c.originalHeight}, 'fast', 'swing', function() {
                        c.$lbcontact.fadeOut('fast', function() {
                            b('#lb-container-description').fadeIn('fast');
                            c.enableKeyboardNav();
                        });
                    });
                }else {
                    c.$lbcontact.fadeOut('fast', function() {
                        b('#lb-container-description').fadeIn('fast');
                        c.enableKeyboardNav();
                    });
                }
            });
            $("#lb_sent_form" ).on( "click", function() {
                var nombre = $("#lb-contact-name").val();
                var email = $("#lb-contact-email").val();
                var subject = $("#lb-contact-subject").val();
                var message = $("#lb-contact-message").val();
                var code = c.album[c.currentImageIndex].code;
                var business = $("#lb-contact-business").val();
                var rut = $('#lb-contact-rut').val();
                var mailto = c.album[c.currentImageIndex].mailto;
                /*
                var data = {name: nombre, email: email, subject : subject,
                    message: message, business: business, code: code, rut: rut,
                    mailto: mailto};
                    */
                var data = 'name='+nombre;
                data += "&email="+email;
                data += "&subject="+subject;
                data += "&message="+message;
                data += "&business="+business;
                data += "&code="+code;
                data += "&rut="+rut;
                data += "&mailto="+mailto;

                $.ajax({
                    type: "POST",
                    url: 'mail.php',
                    data: 'tipo=enviarform&'+data,
                    success: function (response) {
                        console.log(response);
                        $("#lb-contact-name").val('');
                        $("#lb-contact-email").val('');
                        $("#lb-contact-subject").val('');
                        $("#lb-contact-message").val('');
                        $("#lb-contact-business").val('');
                        $("#lb-contact-rut").val('');
                        if(c.contactHeight > c.originalHeight) {
                            c.$outerContainer.animate({ height: c.originalHeight}, 'fast', 'swing', function() {
                                c.$lbcontact.fadeOut('fast', function() {
                                    b('#lb-container-description').fadeIn('fast');
                                    c.enableKeyboardNav();
                                });
                            });
                        }else {
                            c.$lbcontact.fadeOut('fast', function() {
                                b('#lb-container-description').fadeIn('fast');
                            });
                        }
                        alert('Mensaje Enviado con éxito');
                    }
                });
            });
            return this.$lightbox.find('.lb-loader, .lb-close').on('click', function () {
                c.end();
                return false
            });

        };
        c.prototype.start = function (c) {
            var f, e, j, d, g, n, o, k, l, m, p, h, i;
            b('#lb-container-description').hide();
            b('#lb-contact').hide();
            b(window).on("resize", this.sizeOverlay);
            b('select, object, embed').css({visibility: "hidden"});
            this.$overlay.width(b(document).width()).height(b(document).height()).fadeIn(this.options.fadeDuration);
            this.album = [];
            g = 0;
            j = c.attr('data-lightbox');
            if (j) {
                h = b(c.prop("tagName") + '[data-lightbox="' + j + '"]');
                for (d = k = 0, m = h.length; k < m; d = ++k) {
                    e = h[d];
                    this.album.push({link: b(e).attr('href'), title: b(e).attr('title'),
                        desc:  b(e).attr('data-desc'), code: b(e).attr('data-code'),
                        showButton: b(e).attr('data-show-button'),mailto: b(e).attr('data-mailto')});
                    if (b(e).attr('href') === c.attr('href')) {
                        g = d
                    }
                }
            } else {
                if (c.attr('rel') === 'lightbox') {
                    this.album.push({link: c.attr('href'), title: c.attr('title')})
                } else {
                    i = b(c.prop("tagName") + '[rel="' + c.attr('rel') + '"]');
                    for (d = l = 0, p = i.length; l < p; d = ++l) {
                        e = i[d];
                        this.album.push({link: b(e).attr('href'), title: b(e).attr('title')});
                        if (b(e).attr('href') === c.attr('href')) {
                            g = d
                        }
                    }
                }
            }
            f = b(window);
            o = f.scrollTop() + f.height() / 10;
            n = f.scrollLeft();
            this.$lightbox.css({top: o + 'px', left: n + 'px'}).fadeIn(this.options.fadeDuration);

            this.changeImage(g)
        };
        c.prototype.changeImage = function (f) {
            b('#lb-container-description').hide();
            var d, c, e = this;
            this.disableKeyboardNav();
            d = this.$lightbox.find('.lb-image');
            this.sizeOverlay();
            this.$overlay.fadeIn(this.options.fadeDuration);
            b('.lb-loader').fadeIn('slow');
            this.$lightbox.find('.lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption').hide();
            this.$outerContainer.addClass('animating');
            c = new Image();

            c.onload = function () {
                var m, g, h, i, j, k, l;
                d.attr('src', e.album[f].link);
                m = b(c);
                d.width(c.width);
                d.height(c.height);
                if (e.options.fitImagesInViewport) {
                    l = b(window).width();
                    k = b(window).height();
                    j = l - e.containerLeftPadding - e.containerRightPadding - 20;
                    i = k - e.containerTopPadding - e.containerBottomPadding - 110;
                    if ((c.width > j) || (c.height > i)) {
                        if ((c.width / j) > (c.height / i)) {
                            h = j;
                            g = parseInt(c.height / (c.width / h), 10);
                            d.width(h);
                            d.height(g)
                        } else {
                            g = i;
                            h = parseInt(c.width / (c.height / g), 10);
                            d.width(h);
                            d.height(g)
                        }
                    }
                }
                return e.sizeContainer(d.width(), d.height())
            };
            c.src = this.album[f].link;

            this.currentImageIndex = f
        };
        c.prototype.sizeOverlay = function () {
            return b('#lightboxOverlay').width(b(document).width()).height(b(document).height())
        };
        c.prototype.sizeContainer = function (f, g) {
            var b, d, e, h, c = this;
            h = this.$outerContainer.outerWidth();
            e = this.$outerContainer.outerHeight();
            d = f + this.containerLeftPadding + this.containerRightPadding;
            b = g + this.containerTopPadding + this.containerBottomPadding;
            this.$outerContainer.animate({width: d, height: b}, this.options.resizeDuration, 'swing');
            setTimeout(function () {
                c.$lightbox.find('.lb-dataContainer').width(d);
                c.$lightbox.find('.lb-prevLink').height(b);
                c.$lightbox.find('.lb-nextLink').height(b);
                c.showImage()

            }, this.options.resizeDuration)
        };
        c.prototype.showImage = function () {
            this.$lightbox.find('.lb-loader').hide();
            console.log(this);
            var e = this;
            this.$lightbox.find('.lb-image').fadeIn('slow',function() {
                var i = e.currentImageIndex;
                if(e.album[i].desc != null) {
                    b('#lb-description').html(e.album[i].desc);
                    if(e.album[i].showButton == 1)
                        b('#lb-cotizar').show();
                    else
                        b('#lb-cotizar').hide();
                    b('#lb-container-description').show(800);
                }
            });
            this.updateNav();
            this.updateDetails();
            this.preloadNeighboringImages();
            this.enableKeyboardNav()

        };
        c.prototype.updateNav = function () {
            this.$lightbox.find('.lb-nav').show();
            if (this.album.length > 1) {
                if (this.options.wrapAround) {
                    this.$lightbox.find('.lb-prev, .lb-next').show()
                } else {
                    if (this.currentImageIndex > 0) {
                        this.$lightbox.find('.lb-prev').show()
                    }
                    if (this.currentImageIndex < this.album.length - 1) {
                        this.$lightbox.find('.lb-next').show()
                    }
                }
            }
        };
        c.prototype.updateDetails = function () {
            var b = this;
            if (typeof this.album[this.currentImageIndex].title !== 'undefined' && this.album[this.currentImageIndex].title !== "") {
                this.$lightbox.find('.lb-caption').html(this.album[this.currentImageIndex].title).fadeIn('fast')
            }
            if (this.album.length > 1 && this.options.showImageNumberLabel) {
                this.$lightbox.find('.lb-number').text(this.options.albumLabel(this.currentImageIndex + 1, this.album.length)).fadeIn('fast')
            } else {
                this.$lightbox.find('.lb-number').hide()
            }
            this.$outerContainer.removeClass('animating');
            this.$lightbox.find('.lb-dataContainer').fadeIn(this.resizeDuration, function () {
                return b.sizeOverlay()
            })
        };
        c.prototype.preloadNeighboringImages = function () {
            var c, b;
            if (this.album.length > this.currentImageIndex + 1) {
                c = new Image();
                c.src = this.album[this.currentImageIndex + 1].link
            }
            if (this.currentImageIndex > 0) {
                b = new Image();
                b.src = this.album[this.currentImageIndex - 1].link
            }
        };
        c.prototype.enableKeyboardNav = function () {
            b(document).on('keyup.keyboard', b.proxy(this.keyboardAction, this))
        };
        c.prototype.disableKeyboardNav = function () {
            b(document).off('.keyboard')
        };
        c.prototype.keyboardAction = function (g) {
            var d, e, f, c, b;
            d = 27;
            e = 37;
            f = 39;
            b = g.keyCode;
            c = String.fromCharCode(b).toLowerCase();
            if (b === d || c.match(/x|o|c/)) {
                this.end()
            } else if (c === 'p' || b === e) {
                if (this.currentImageIndex !== 0) {
                    this.changeImage(this.currentImageIndex - 1)
                }
            } else if (c === 'n' || b === f) {
                if (this.currentImageIndex !== this.album.length - 1) {
                    this.changeImage(this.currentImageIndex + 1)
                }
            }
        };
        c.prototype.end = function () {
            this.disableKeyboardNav();
            b(window).off("resize", this.sizeOverlay);
            this.$lightbox.fadeOut(this.options.fadeDuration);
            this.$overlay.fadeOut(this.options.fadeDuration);
            return b('select, object, embed').css({visibility: "visible"})
        };
        return c
    })();
    b(function () {
        var e, b;
        b = new c();
        return e = new d(b)
    })
}).call(this);