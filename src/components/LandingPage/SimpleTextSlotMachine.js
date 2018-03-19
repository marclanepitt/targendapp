import React, { Component } from 'react';
import "./css/slot.css"
import $ from "jquery";

class SimpleTextSlotMachine extends Component {

	constructor(props) {
		super(props)
		this.popPushNItems = this.popPushNItems.bind(this);
		this.buildSlotItem = this.buildSlotItem.bind(this);
		this.rotateContents = this.rotateContents.bind(this);
		this.randomSlotttIndex = this.randomSlotttIndex.bind(this);
		this.buildSlotContents = this.buildSlotContents.bind(this);
		this.animate = this.animate.bind(this);

	}
	componentDidMount() {
		  let $wordbox = $('#wordbox .slottt-machine-recipe__items_container');
		  this.buildSlotContents($wordbox, this.props.list);		  
		  setInterval(this.animate(this), 2000);
	}

	buildSlotItem (text) {
	    return $('<div>').addClass('slottt-machine-recipe__item')
	                     .text(text)
	}

	buildSlotContents ($container, wordlist) {
	  let items = wordlist.map(this.buildSlotItem);
	  $container.append(items);
	}

	popPushNItems ($container, n) {
	    let children = $container.find('.slottt-machine-recipe__item');
	    children.slice(0, n).insertAfter(children.last());

	    if (n === children.length) {
	      this.popPushNItems($container, 1);
	    }
	}
  

	rotateContents ($container, n,_this) {
	    setTimeout(function () {
	      _this.popPushNItems($container, n);
	      $container.css({top: 0});
	    }, 300);    
	}
	animate(_this) {
	  let $wordbox = $('#wordbox .slottt-machine-recipe__items_container');
	  var wordIndex = this.randomSlotttIndex(this.props.list.length);
	  $wordbox.animate({top: -wordIndex*150}, 500, 'swing', function () {
	    _this.rotateContents($wordbox, wordIndex,_this);
	  });
	}
	randomSlotttIndex(max) {
	  var randIndex = (Math.random() * max | 0);
	  console.log(randIndex)
	  return (randIndex > 1) ? randIndex : this.randomSlotttIndex(max);
	}

  


  render() {
    return (
      <div>
      <div className="slottt-machine-recipe">
		  <div className="slottt-machine-recipe__mask" id="wordbox">
		      <div className="slottt-machine-recipe__items_container recipe_if">
		      </div>
		  </div>
		</div>
      </div>
    );
  }
}

export default SimpleTextSlotMachine;
