//Selects the time block thats clicked. 
//Saves the text typed into the selected time.
function savePlans(plans) {
  var timeClicked = $(plans.target);
  var blockTime = timeClicked.parent('.time-block').attr('id');
  var blockText = timeClicked.siblings("textarea").val();
  localStorage.setItem(blockTime, JSON.stringify(blockText));
}
//calls all DOM functions after elements load.
//saves the text after clicked in the time-block.
$(function () {
  var timeBlocks = $('.time-block');
  timeBlocks.children('button').on('click', savePlans);
// checks the time of each block and sets style respectively.
timeBlocks.each(function(){
  var currentHrId = $(this).attr("id");
  var blockHour = currentHrId.split('-')[1];
  if(blockHour < dayjs().hour()){
    $(this).removeClass('.present .future');
    $(this).addClass('.past');
  }else if (blockHour == dayjs().hour()){
    $(this).removeClass('.past .future');
    $(this).addClass('.present'); 
  }
  else {
    $(this).removeClass('.past .present');
    $(this).addClass('.future');
  }
});

timeBlocks.each(function(){
  var savedinput;
  try{
    savedinput = JSON.parse(localStorage.getItem($(this).attr('id')));
  } catch (e) {
    // Error.
  }
  if (savedinput !== null){
    $(this).children('textarea').val(savedinput);
  }
})
// Displays the current date.
$('#currentDay').text(dayjs().format('dddd, MMMM D'));

});