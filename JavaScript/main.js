const colors = ["#fe0000", "#ff7900", "#ffff01", "#13dd17", "#304fff", "#7b20a3", "#d600ff"]; // Rainbow colors

var number_groups = 3;
var current_number = 0;

var used_numbers = [];
var groups = [];

function generate_board(){
    // reset groups
    groups = []

    var number_groups = $('#number_groups').val();

    current_number = generate_new_number();
    points = get_points_of_number(current_number);

    var board = "<h2 id='next_number'>Nächste: "+current_number.toString()+"("+points.toString()+")</h2><div class='groups'>";

    for(var i = 0; i < Math.min(number_groups, 7); i++){ // limit the number of groups to 7
        board += add_group(i);
    }

    board += "</div>";

    $("#game").html(board);

    console.log(groups);
}

function add_group(index){
    // add group to group array
    groups.push({"index": index, "points": 0});

    // frontend for the group
    var background = colors[index];

    var result = `
    <div class='group' id='group` + index.toString() + `' style='background: `+background+`80' onclick='checked(`+index.toString()+`)'>
        <div class='points'>Punkte: 0</div>
        <div class='checked' id='checked`+ index.toString() +`'></div>
    </div>
    `;

    return result;
}

function checked(group){
    // get points
    var points = get_points_of_number(current_number);

    // update points of group
    var current_points_of_group = groups[group]["points"];
    var new_points = current_points_of_group + points;
    groups[group]["points"] = new_points;

    // generate a new number to check
    var old_number = current_number
    current_number = generate_new_number();
    var current_number_points = get_points_of_number(current_number);

    // update html
    $("#next_number").html("Nächste: "+current_number.toString() + "(" + current_number_points.toString() + ")");
    $("#group"+group.toString()+" .points").html("Punkte: " + new_points.toString());
    $("#checked"+group.toString()).append("<p>" + old_number.toString() + "</p>");
}

function skip_number(){
    // generate new number
    current_number = generate_new_number();
    var current_number_points = get_points_of_number(current_number);

    // update frontend
    $("#next_number").html("Nächste: "+current_number.toString() + "(" + current_number_points.toString() + ")");
}

function generate_new_number(){
    var new_number = getRandomInt(10, 120);

    while(used_numbers.includes(new_number)){
        var new_number = getRandomInt(10, 120);
    }

    return new_number;
}

function get_points_of_number(num){
    if(num > 100){
        return 4;
    }

    if(num > 60){
        return 3;
    }

    if(num > 40){
        return 2;
    }

    return 1;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

window.onload = function(){generate_board();}
