// set up keycodes
const keyCodes = Object.freeze({
	TAB: 9,
	RETURN: 13,
	ESC: 27,
	SPACE: 32,
	PAGEUP: 33,
	PAGEDOWN: 34,
	END: 35,
	HOME: 36,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40
});

// helper function to turn list of elements into an array
function slice(nodes) {
    return Array.prototype.slice.call(nodes);
}

// copied from Question_Comp.js with some changes hardcoded to make this example work
function nQue(qtyp, cqtn, curComp, qestA, curQnum) {
	// setting up some variables that would have been taken care of by component engine
	curComp = 40;
	let Q_Feedback_Array = [];
	Q_Feedback_Array[curComp] = [
		"That's correct!",
		"Swapnil is an external customer because he owns one of the company's products, and he is an individual customer because he owns the product for his own benefit.",
		"Sorry. That's incorrect.",
		"Swapnil is an external customer because he owns one of the company's products, and he is an individual customer because he owns the product for his own benefit.",
		"jb1",
		"",
		"jb1"
	];
	let Q_Answer_Key = [];
	Q_Answer_Key[curComp] = [
		{ q_answer: "External, individual customer", true_false: "true" },
		{ q_answer: "External, organizational customer", true_false: "false" },
		{ q_answer: "Internal, individual customer", true_false: "false" }
	];

	switch (qtyp) {
		case 1:
			switch (cqtn) {
				case true:
					document.getElementById("cb_40_0").className = "c_checkmark";
					document.getElementById("q_feedback_40").className = "q_cor_border";
					document.getElementById("q_feedback_texthead_40").className = "q_txthead_c";
					document.getElementById("q_feedback_texthead_40").innerHTML = Q_Feedback_Array[curComp][0];
					document.getElementById("q_feedback_text_40").innerHTML = Q_Feedback_Array[curComp][1];
					document.getElementById("q_feedback_40").style.display = "block";
					break;

				case false:
					document.getElementById("cb_40_2").className = "i_checkmark";
					document.getElementById("q_feedback_40").className = "q_inc_border";
					document.getElementById("q_feedback_texthead_40").className = "q_txthead_i";
					document.getElementById("q_feedback_texthead_40").innerHTML = Q_Feedback_Array[curComp][2];
					document.getElementById("q_feedback_text_40").innerHTML = Q_Feedback_Array[curComp][3];
					document.getElementById("q_feedback_40").style.display = "block";

					for (var shwCor = 0; shwCor < Q_Answer_Key[curComp].length; shwCor++) {
						if (Q_Answer_Key[curComp][shwCor].true_false === "true") {
							document.getElementById("qs_40" + "_an_" + shwCor).style.border = "2px solid #85be00";
						}
					}

					break;
			}

			break;

		case 2:
			switch (document.getElementById("cb_40" + "_" + qestA).className) {
				case "checkmark_square":
					document.getElementById("cb_40" + "_" + qestA).className = "checkmark_square_wait";
					Q_Multi_Answers[curComp][qestA] = "true";

					break;

				case "checkmark_square_wait":
					document.getElementById("cb_40" + "_" + qestA).className = "checkmark_square";
					Q_Multi_Answers[curComp][qestA] = "false";

					break;
			}

			document.getElementById("sub_40").className = "btn btn-primary";
			break;
	}

	document.getElementById("sqn_40").scrollIntoView(false);
}

// handles clicks of radio buttons
function radioClick(e) {
	let target = e.currentTarget;
	// get all children of parent node
	let children = slice(target.parentNode.children);
	setChecked(e.currentTarget, false, children);
}

// handles keydowns for radio buttons
function radioKeyDown(e) {
	let target = e.currentTarget;
	// get all children of parent node
	let children = slice(target.parentNode.children);
	// let flag = false;
	console.log(children[0]);

	// use the keycode to decide what to do
	switch (e.keyCode) {
		case keyCodes.SPACE:
			setChecked(target, true, children);
			flag = true;
			break;

		case keyCodes.UP:
		case keyCodes.LEFT:
			movePrev(target, children);
			flag = true;
			break;

		case keyCodes.DOWN:
		case keyCodes.RIGHT:
			moveNext(target, children);
			flag = true;
			break;

		default:
			break;
	}
}

function setChecked(target, isKeyDown, children) {
    console.log(target);
	// filter out the target
	let siblings = Array.prototype.filter.call(children, function (sibling) {
		return sibling !== target;
	});

	// set all aria-checked attributes to false
	for (let sibling of siblings) {
		sibling.setAttribute("aria-checked", "false");
	}

	// set target aria-checked attribute to true
	target.setAttribute("aria-checked", "true");

	// Ff this is a keydown event, we need to call nQue function
	// There's already an onclick listener for nQue function.
	if (isKeyDown) {
		// nQue function paramters from the target
		let funcParam = target
			// get the onclick attribute
			.getAttribute("onclick")
			// use a regex to get the paramaters from the nQue function
			.replace(/radioClick\(event\);nQue\((.*?)\);/, "$1")
			// split paramters into array
			.split(",");
		// call nQue with those paramaters
		nQue(parseInt(funcParam[0]), funcParam[1] == "true", parseInt(funcParam[2]), parseInt(funcParam[3]), parseInt(funcParam[4]));
	}
}

// The default behavior of radiogroups is to automatically check the button if moving from one to the next. This is problematic for keyboard users in our use case. Moving to the next answer option would automatically select it and not give the user a chance to answer correctly on the first try. So instead, we just change the focused radio and DON'T set aria-checked to true or call nQue() until the user has explicitly hit the SPACE button
function moveNext(target, children) {
	// if on the last radio, move to first
	if (target === children[children.length - 1]) {
        children[0].focus();
	// otherwise move to next
	} else {
        children[children.indexOf(target) + 1].focus();
	}
}

function movePrev(target, children) {
	// if on the first radio, move to last
	if (target === children[0]) {
        children[children.length - 1].focus();
	// otherwise move to previous
	} else {
        children[children.indexOf(target) - 1].focus();
	}
}
