$(document).ready(function() {
  // show topic page on click
  $('.topic img').click(function() {
    window.location.href = $(this).data().url;
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

    var arrowWidth = 20;
    var isLastTopicInRow = true;
    var style = { top: -(arrowWidth + 2) }; // - width + 2 to fix arrow position

    $.each(this$.siblings(), function(key, otherTopic) {
      if ($(otherTopic).position().left > position.left) {
        isLastTopicInRow = false;
      }
    });

    if (isLastTopicInRow) {
      style.right = width + arrowWidth;
    } else {
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

    if (this$.hasClass('last-one')) {
      $('<div class="dataset-menu left-menu"><div class="dataset-menu-container">' + menu.join('') +'</div></div>').css(style).appendTo(this$);
    } else {
      $('<div class="dataset-menu"><div class="dataset-menu-container">' + menu.join('') +'</div></div>').css(style).appendTo(this$);
    }

    $('.dataset-menu .dataset-menu-container').css('width', (11 * menu.length) + 'rem'); // base size is 11 rem

  }, function() {
    $('.dataset-menu').remove();
    $('.topic').removeClass('active behind-other-topics');
  });
});
