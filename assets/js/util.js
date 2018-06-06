// Utility functions
/**
 *
 * @param content
 * @constructor the Paragraph constructor
 */
function Paragraph(content) {
	const id = guid();
	this.id = id;
	const obj = {id};
	if(content) {
		obj.content = content;
		this.content = content;
	}
	this.object = obj;
}

/**
 * @function Get the object of the current paragraph instance
 * @return {{id: *}|*}
 */
Paragraph.prototype.getObject = function () {
	return this.object;
};

/**
 * @function Get the id of the paragraph instance
 * @return {*}
 */
Paragraph.prototype.getId = function () {
	return this.id;
};

Paragraph.prototype.getContent = function () {
	return this.content || '';
};

/**
 * @function Utility function to generate a unique id for paragraphs
 * @return {string}
 */
function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

/**
 * @function Get's the caret position in an element
 * @param element
 * @return {number}
 */

function getCaretPos(element) {
	let caretOffset = 0;
	const doc = element.ownerDocument || element.document;
	const win = doc.defaultView || doc.parentWindow;
	let sel;
	if (typeof win.getSelection !== 'undefined') {
		sel = win.getSelection();
		if (sel.rangeCount > 0) {
			const range = win.getSelection().getRangeAt(0);
			const preCaretRange = range.cloneRange();
			preCaretRange.selectNodeContents(element);
			preCaretRange.setEnd(range.endContainer, range.endOffset);
			caretOffset = preCaretRange.toString().length;
		}
	} else if ( (sel = doc.selection) && sel.type !== 'Control') {
		const textRange = sel.createRange();
		const preCaretTextRange = doc.body.createTextRange();
		preCaretTextRange.moveToElementText(element);
		preCaretTextRange.setEndPoint('EndToEnd', textRange);
		caretOffset = preCaretTextRange.text.length;
	}
	return caretOffset;
}
