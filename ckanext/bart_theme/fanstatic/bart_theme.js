$(document).ready(function() {

  var wasFocused = false;

  // show topic page on click
  $('.topic img').click(function() {
    window.location.href = $(this).data().url;
  });

  // hide Organizations filter
  $('section.module').each(function() {
    var text = $(this).text().trim();

    if ((/Organizations/).test(text)) {
      $(this).remove();
    } else {
      $(this).show();
    }
  });

  // fade other menu items on hover
  $('.topic').on('mouseover', '.dataset-menu-item', function() {
    $('.dataset-menu-item').addClass('unfocused');
    $(this).removeClass('unfocused');
  }).on('mouseout', '.dataset-menu-item', function() {
    $('.dataset-menu-item').removeClass('unfocused');
  });

  // show menu on hover in
  $('.topic').hover(function() {
    var menu = [];
    var menu_items = [];
    var this$ = $(this);
    var height = this$.outerHeight();
    var width = this$.outerWidth();
    var position = this$.position();
    var datasets = this$.data().datasets;

    var style = {
      left: width + 20, // 20 is arrow width
      top: - 20 - 2 // - 2 to fix arrow position
    };


    _.forEach(datasets, function(dataset) { // create resource menu
      var url = '/dataset/' + dataset.name + '/resource/' + dataset.resource_id;
      menu_items.push('<li class="dataset-menu-item" data-url="' + url + '">' + dataset.title + '</li>')
    });

// TODO: add class to topic to identify which one should get left menu instead of right

    _.forEach(_.chunk(menu_items, 5), function(links, index) {
      menu.push('<div class="pull-left"><ul>' + links.join('') +'</ul></div>');
    });

    this$.addClass('active').siblings().addClass('behind-other-topics'); // all but "this"

    $('<div class="dataset-menu"><div class="dataset-menu-container">' + menu.join('') +'</div></div>').css(style).appendTo(this$);

    $('.dataset-menu .dataset-menu-container').css('width', (11 * menu.length) + 'rem'); // base size is 11 rem

    setTimeout(function() {
      // show dataset preview page on link
      $('.dataset-menu').hover(function() {
        wasFocused = true;
      }, function() {
        wasFocused = false;
        this$.removeClass('active');
        $('.dataset-menu').remove();
        $('.topic').removeClass('behind-other-topics');
      }).on('click', 'li', function() {
        window.location.href = $(this).data().url;
      });
    }, 10);
  }, function() {
    if (!wasFocused) {
      $('.dataset-menu').remove();
      $('.topic').removeClass('active behind-other-topics');
    }
  });
});
