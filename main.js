var my_card='';
var first_clicked_card;
var attempts=0;
var successful_attempts=0;
var accuracy=0.0;
var start_time = null;
var end_time = null;

function check_card(target_element){

    
    //Our code will go here
  //target_element.style.display='none';
    var my_parent = target_element.parentNode;
    var my_front_card = my_parent.querySelector('.card_front');
    target_element.classList.add('card_back_selected');
    my_front_card.classList.add('card_front_selected');
       console.log(target_element,target_element.classList);
  if(my_card==''){
      if(start_time==null)
      {
          start_time = new Date;
      }
    //first card was clicked
    my_card = target_element.getAttribute('front');
    first_clicked_card = target_element;
  }
  else
  {
      //this is executed during my second click
    attempts=attempts+1;   
    //can also be written as attempts+=1;   
    //or    
    //attempts++; 
    //There are slight differences between these two that will become important later.
    var first_parent = first_clicked_card.parentNode;
    var first_front_card = first_parent.querySelector('.card_front');
    if(my_card == target_element.getAttribute('front')) {
        //THIS IS EXECUTED WHEN THE CARDS MATCH
        
        //console.log('my parent is',my_parent);
        my_parent.classList.add('card_container_matched');
        
        
        my_front_card.classList.add('card_matched');

        
        first_parent.classList.add('card_container_matched');
        
        
        first_front_card.classList.add('card_matched');
        successful_attempts++;
        update_accuracy();
        if(total_card_count == matched_card_count)
        {
            //end_time = new Date;
            alert("YOU WIN!");
        }
    }
    else{
        //THE CARDS DON'T MATCH
        alert("Your cards do not match.  Press OK To continue");
        //target_element.style.display='block';
        //first_clicked_card.style.display='block';
        target_element.classList.remove('card_back_selected');
        my_front_card.classList.remove('card_front_selected');
        first_clicked_card.classList.remove('card_back_selected');
        first_front_card.classList.remove('card_front_selected');
        update_accuracy();
        /*window.setTimeout(function(){
            target_element.style.display='block';
            first_clicked_card.style.display='block';
        },1000);*/

    }
    my_card='';
  }
}
function show_hint()
{
    var start_hint = document.querySelector('.card_back:not(.card_back_selected)');
    console.log(start_hint);
    var target_front = start_hint.getAttribute('front');
    console.log("looking for ",target_front);
    var hint_elements = document.querySelectorAll('.card_back[front='+target_front+']');
    console.log("hints: ",hint_elements);
}

function getElpasedTime()
{
}
function update_accuracy()
{
    var total_card_count = document.querySelectorAll('.card_container').length;
    var matched_card_count = document.querySelectorAll('.card_container_matched').length;
    
    accuracy = (successful_attempts / attempts) * 100;
    document.querySelector('#accuracy_display').innerHTML = accuracy+"%";
}
function reset_cards()
{
    var all_cards=[];  //make it an empty array.  Mostly this is so we know to expect it to be filled with array elements
    all_cards= document.querySelectorAll('.card_container');
    //all_cards is an array, filled by querySelectorAll
    for(var i=0; i<all_cards.length ; i++)
    {
        all_cards[i].classList.remove('card_container_matched');  //remove "matched" class
        all_cards[i].querySelector('.card_front').classList.remove('card_matched');//remove "matched" class
        all_cards[i].querySelector('.card_back').style.display='block';//rehide the front face by showing the back

    }
    my_card=''; //reset our my_card variable, just to be sure.  We might call this function between 1st and 2nd click
    attempts=0; //reset our stat information
    successful_attempts=0;  //reset our stat information
    document.querySelector('#accuracy_display').innerHTML = "0%";  //reset our stat display
}


