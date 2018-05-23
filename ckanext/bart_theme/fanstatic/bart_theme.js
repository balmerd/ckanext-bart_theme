$(document).ready(function() {
  // hide page heading on Terms of Use page
  $('#terms-of-use').parent().parent().find('h1.page-heading').hide()

  // show topic page on click
  $('.topic img').click(function() {
    window.location.href = $(this).data().url;
  });

  // show dataset menu on hover

  function topicHoverIn() {
    var menu = [];
    var menu_items = [];
    var this$ = $(this);
    var height = this$.outerHeight();
    var width = this$.outerWidth();
    var position = this$.position();
    var datasets = this$.data().datasets;

    var menuClass;
    var arrowWidth = 20;
    var isLastTopicInRow = true;
    var style = { top: -(arrowWidth + 2) }; // - width + 2 to fix arrow position

    $.each(this$.siblings(), function(key, otherTopic) {
      if ($(otherTopic).position().left > position.left) {
        isLastTopicInRow = false;
      }
    });

    if (isLastTopicInRow) {
      menuClass = ' left-menu';
      style.right = width + arrowWidth;
    } else {
      menuClass = '';
      style.left = width + arrowWidth;
    }

    _.forEach(datasets, function(dataset) { // create resource menu
      var url = '/dataset/' + dataset.name + '/resource/' + dataset.resource_id;
      menu_items.push('<li class="dataset-menu-item" data-url="' + url + '">' + dataset.title + '</li>')
    });

    _.forEach(_.chunk(menu_items, 5), function(links, index) {
      menu.push('<div class="pull-left"><ul>' + links.join('') +'</ul></div>');
    });

    this$.addClass('active').siblings().addClass('behind-other-topics'); // all but "this"

    setTimeout(function() {
      $('<div class="dataset-menu' + menuClass + '"><div class="dataset-menu-container" style="width:' + (11 * menu.length) + 'rem">' + menu.join('') +'</div></div>').css(style).appendTo(this$);
      setTimeout(function() {
        $('.dataset-menu').on('click', 'li', function() {
          window.location.href = $(this).data().url;
        });
      }, 10);
    }, 25);
  }

  function topicHoverOut() {
    $('.dataset-menu').remove();
    $('.topic').removeClass('active behind-other-topics');
  }

  $('.topic') // fade other menu items on hovers
    .on('mouseover', '.dataset-menu-item', function() {
      $('.dataset-menu-item').addClass('unfocused');
      $(this).removeClass('unfocused');
    })
    .on('mouseout', '.dataset-menu-item', function() {
      $('.dataset-menu-item').removeClass('unfocused');
    });

    // show dataset menu on hover
    $('.topic').hover(_.debounce(topicHoverIn, 250, { leading: true, trailing: false }), topicHoverOut);
});
