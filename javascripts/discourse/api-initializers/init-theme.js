import { apiInitializer } from "discourse/lib/api";
import $ from "jquery";

export default apiInitializer((api) => {
  $.expr[":"].contains = $.expr.createPseudo(function (arg) {
    // make case insensitive
    return function (elem) {
      return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
  });

  let emoji = {};

  settings.username_emoji.split("|").forEach((pair) => {
    let split = pair.split(",");
    emoji[split[0].toLowerCase()] = split[1];
  });

  $.each(emoji, function (key, value) {
    api.decorateCooked(($elem) =>
      $elem
        .find("a.mention:contains(" + key + ")")
        .attr("data-emoji", value)
        .addClass("with-emoji")
    );
  });
});
