# ChiSE version 1

ChiSE is a web application based on [SBGNViz.js](https://github.com/iVis-at-Bilkent/sbgnviz.js), which in turn is based on [cytoscape.js](http://cytoscape.github.io/cytoscape.js/), to visualize and edit the pathway models represented by [SBGN Process Description Notation](http://www.sbgn.org/Image:Refcard-PD.png). It accepts the pathway models represented in [SBGN-ML](http://sourceforge.net/apps/mediawiki/libsbgn/index.php?title=Exchange_Format) format, and can save edited pathways back to the same format as well as static image formats (PNG and JPEG).
<br/>

## Software

ChiSE is distributed under [GNU Lesser General Public License](http://www.gnu.org/licenses/lgpl.html). 

**A sample application using ChiSE** can be found [here](http://cs.bilkent.edu.tr/~ivis/ChiSE_sample_app/). The sample application source codes are available [here].(https://github.com/iVis-at-Bilkent/chise.js-sample-app)

Please cite the following when you use ChiSE.js:

M. Sari, I. Bahceci, U. Dogrusoz, S.O. Sumer, B.A. Aksoy, O. Babur, E. Demir, "[SBGNViz: a tool for visualization and complexity management of SBGN process description maps](http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0128985)", PLoS ONE, 10(6), e0128985, 2015.

## Default Options
```javascript
    var options = {
        // The path of core library images when sbgnviz is required from npm and the index html 
        // file and node_modules are under the same folder then using the default value is fine
        imgPath: 'node_modules/sbgnviz/src/img',
        // Whether to fit labels to nodes
        fitLabelsToNodes: function () {
          return false;
        },
        // dynamic label size it may be 'small', 'regular', 'large'
        dynamicLabelSize: function () {
          return 'regular';
        },
        // percentage used to calculate compound paddings
        compoundPadding: function () {
          return 10;
        },
        // Whether to adjust node label font size automatically.
        // If this option return false do not adjust label sizes according to node height uses node.data('labelsize')
        // instead of doing it.
        adjustNodeLabelFontSizeAutomatically: function() {
          return true;
        },
        // The selector of the component containing the sbgn network
        networkContainerSelector: '#sbgn-network-container',
        // Whether the actions are undoable, requires cytoscape-undo-redo extension
        undoable: true,
        // Whether to have undoable drag feature in undo/redo extension. This options will be passed to undo/redo extension
        undoableDrag: true
      };
```

## ChiSE Specific Data
```javascript
// Nodes specific data.
node.data('id'); // Id of a node. (Specific to cytoscape.js)
node.data('label'); // Label of a node.
node.data('parent'); // Parent id of a node. (Specific to cytoscape.js)
node.data('class'); // SBGN specific class of a node. If it ends with 'multimer' it means that this node is a multimer.
node.data('clonemarker'); // Whether the node is cloned.
node.data('bbox'); // Bounding box of a node includes bbox.x, bbox.y, bbox.w, bbox.h
node.data('ports'); // Ports list of a node. A node port includes port.id, port.x, port.y where port.x and port.y are percentages relative to node position and size.
node.data('statesandinfos'); // Includes state and information boxes list of a node.
node.data('labelsize'); // If the font sizes of the nodes are not automatically adjusted (controlled by adjustNodeLabelFontSizeAutomatically option) their font size is adjusted by this data.
// A stateorinfobox includes the followings.
var stateorinfobox = node.data('statesandinfos')[i];
stateorinfobox.id; // Id of that box.
stateorinfobox.clazz; // See whether that box is related to a 'unit of information' or a 'state variable'.
stateorinfobox.bbox; // Bbox of that box. Includes bbox.x, bbox.y, bbox.w, bbox.h where bbox.x and bbox.y are percentages relative to node position and size.
stateorinfobox.state; // Just included in state variables. Includes state.value and state.variable.
stateorinfobox.label; // Just included in units of information includes label.text.
// Edges specific data.
edge.data('id'); // Id of an edge. (Specific to cytoscape.js)
edge.data('source'); // Id of source node. (Specific to cytoscape.js)
edge.data('target'); // Id of target node. (Specific to cytoscape.js)
edge.data('class'); // SBGN specific class of an edge.
edge.data('cardinality'); // SBGN cardinality of an edge.
edge.data('portsource'); // This is set if the edge is connected to its source node by a specific port of that node.
edge.data('porttarget'); // This is set if the edge is connected to its target node by a specific port of that node.
edge.data('bendPointPositions'); // Bend point positions of an edge. Includes x and y coordinates. This data is to be passed to edgeBendEditing extension.
```

## API
ChiSE.js is built at the top of SBGNViz.js and any method exposed by SBGNViz.js is exposed in ChiSE.js. Please see [SBGNViz.js API](https://github.com/iVis-at-Bilkent/sbgnviz.js#api).<br>
You can find the methods where ChiSE.js extends SBGNViz.js API below.

`chise.startSpinner(classname)`
Starts a spinner at the middle of network container element. You can specify a css class that the 
spinner will have. The default classname is 'default-class'. Requires 'fontawesome.css'.

`chise.endSpinner(classname)`
Ends any spinner having a css class with the given name. Requires 'fontawesome.css'.

`chise.addNode(x, y , nodeclass, id, parent, visibility)`
Adds a new node with the given class and at the given coordinates. Optionally you can set the id, parent and visibility of the node. Considers undoable option.

`chise.addEdge(source, target , edgeclass, id, visibility)`
Adds a new edge with the given class and having the given source and target ids. Optionally you can set the id and visibility of the node. Considers undoable option.

`chise.cloneElements(eles)`
Clone given elements. Considers undoable option. Requires cytoscape-clipboard extension.

`chise.copyElements(eles)`
Copy given elements to clipboard. Requires cytoscape-clipboard extension.

`chise.pasteElements(eles)`
Past the elements copied to clipboard. Considers undoable option. Requires cytoscape-clipboard extension.

`chise.align(nodes, horizontal, vertical, alignTo)`
Aligns given nodes in given horizontal and vertical order. Horizontal and vertical parameters may be 'none' or undefined. 
alignTo parameter indicates the leading node. Requires cytoscape-grid-guide extension and considers undoable option.

`chise.createCompoundForGivenNodes(nodes, compoundType)`
Create compound for given nodes. compoundType may be 'complex' or 'compartment'. This method considers undoable option.

`chise.changeParent(nodes, newParent, posDiffX, posDiffY)`
Move the nodes to a new parent and change their position if possDiff params are set. Considers undoable option and checks if the operation is valid.

`chise.createTemplateReaction(templateType, macromoleculeList, complexName, processPosition, tilingPaddingVertical, tilingPaddingHorizontal, edgeLength)`
Creates a template reaction with given parameters. Requires cose-bilkent layout to tile the free macromolecules included in the complex.
Considers undoable option. Parameters are explained below.<br>
templateType: The type of the template reaction. It may be 'association' or 'dissociation' for now.<br>
macromoleculeList: The list of the names of macromolecules which will involve in the reaction.<br>
complexName: The name of the complex in the reaction.<br>
processPosition: The modal position of the process in the reaction. The default value is the center of the canvas.<br>
tilingPaddingVertical: This option will be passed to the cose-bilkent layout with the same name. The default value is 15.<br>
tilingPaddingHorizontal: This option will be passed to the cose-bilkent layout with the same name. The default value is 15.<br>
edgeLength: The distance between the process and the macromolecules at the both sides.<br>

`chise.resizeNodes(nodes, newParent, posDiffX, posDiffY)`
Resize given nodes if useAspectRatio is truthy one of width or height should not be set. Considers undoable option.

`chise.changeNodeLabel(nodes, label)`
Changes the label of the given nodes to the given label. Considers undoable option.

`chise.changeFontProperties(nodes, data)`
Change font properties for given nodes use the given font data. Considers undoable option.
Note that if data.labelsize is set it is associated with data field of nodes and all the other properties inside data parameter 
are associated with css field of nodes. If 'options.adjustNodeLabelFontSizeAutomatically' is false or returns false the font-size of 
nodes are set by data.labelsize.

`chise.changeStateOrInfoBox(nodes, index, value, type)`
Change state value or unit of information box of given nodes with given index. Considers undoable option.
Type parameter indicates whether to change value or variable, it is valid if the box at the given index is a state variable.
Value parameter is the new value to set.
This method returns the old value of the changed data (We assume that the old value of the changed data was the same for all nodes).

`chise.addStateOrInfoBox(nodes, obj)`
Add a new state or info box to given nodes. The box is represented by the parameter obj. Considers undoable option.

`chise.removeStateOrInfoBox(nodes, index)`
Remove the state or info boxes of the given nodes at given index. Considers undoable option.

`chise.setMultimerStatus(nodes, status)`
Set multimer status of the given nodes to the given status. Considers undoable option.

`chise.setCloneMarkerStatus(nodes, status)`
Set clone marker status of given nodes to the given status. Considers undoable option.

`chise.changeCss(eles, name, value)`
Change style/css of given eles by setting getting property name to the given value. Considers undoable option.

`chise.changeData(eles, name, value)`
Change data of given eles by setting getting property name to the given value. Considers undoable option.

`chise.showAndPerformLayout(eles, layoutparam)`
Unhide given eles and perform given layout afterward. Layout parameter may be layout options or a function to call. 
Requires viewUtilities extension and considers undoable option.

`chise.elementUtilities`
General and sbgn specific utilities for cytoscape elements. Extends sbgnviz.elementUtilities, you can find the ChiSE extensions for sbgnviz.elementUtilities below.

 * `defaultProperties` Access the default properties for elements by their classes using this map. These properties are considered in addNode() and addEdge().
 * `addNode(x, y, sbgnclass, id, parent, visibility)` Similar to `chise.addNode()` but do not considers undoable option.
 * `addEdge(source, target, sbgnclass, id, visibility)` Similar to `chise.addEdge()` but do not considers undoable option.
 * `createCompoundForGivenNodes(nodesToMakeCompound, compoundType)` Similar to `chise.createCompoundForGivenNodes()` but do not considers undoable option.
 * `removeCompound(compoundToRemove)` Similar to `chise.removeCompound()` but do not considers undoable option.
 * `changeParent(nodes, newParent, posDiffX, posDiffY)` Similar to `chise.changeParent()` but do not considers undoable option.
 * `resizeNodes(nodes, width, height, useAspectRatio)` Similar to `chise.resizeNodes()` but do not considers undoable option.
 * `getCommonProperty(nodes, width, height, useAspectRatio)` Get common properties of given elements. Returns null if the given element list is empty or the property is not common for all elements. 
    dataOrCss parameter specify whether to check the property on data or css. The default value for it is data. If propertyName parameter is given as a function instead of a string representing the 
    property name then use what that function returns.
 * `trueForAllElements(elements, fcn)` Returns if the function returns a truthy value for all of the given elements.
 * `canHaveSBGNCardinality(ele)` Returns whether the given element or elements with the given class can have sbgncardinality.
 * `canHaveSBGNLabel(ele)` Returns whether the given element or elements with the given class can have sbgnlabel.
 * `canHaveUnitOfInformation(ele)` Returns whether the given element or elements with the given class have unit of information.
 * `canHaveStateVariable(ele)` Returns whether the given element or elements with the given class have state variable.
 * `mustBeSquare(ele)` Returns whether the given element or elements with the given class should have the same width and height.
 * `someMustNotBeSquare(ele)` Returns whether the given element or elements with the given class must not be in square shape.
 * `canBeCloned(ele)` Returns whether the given element or elements with the given class can be cloned.
 * `canBeMultimer(ele)` Returns whether the given element or elements with the given class can be multimer.
 * `isEPNClass(ele)` Returns whether the given class is an EPN class or the given element is an EPN.
 * `isPNClass(ele)` Returns whether the given class is an PN class or the given element is an PN.
 * `isLogicalOperator(ele)` Returns whether the given class is a logical operator class or the given element is a logical operator.
 * `convenientToEquivalence(ele)` Returns whether the given class or the class of the given element is an equivalance class.
 * `relocateStateAndInfos(ele)` Relocates the state and info boxes of the given node.
 * `changeStateOrInfoBox(nodes, index, value, type)` Similar to `chise.changeStateOrInfoBox()` but do not considers undoable option.
 * `addStateOrInfoBox(nodes, obj)` Similar to `chise.addStateOrInfoBox()` but do not considers undoable option.
 * `removeStateOrInfoBox(nodes, index)` Similar to `chise.removeStateOrInfoBox()` but do not considers undoable option.
 * `setMultimerStatus(nodes, status)` Similar to `chise.setMultimerStatus()` but do not considers undoable option.
 * `setCloneMarkerStatus(nodes, status)` Similar to `chise.setCloneMarkerStatus()` but do not considers undoable option.
 * `changeFontProperties(nodes, data)` Similar to `chise.changeFontProperties()` but do not considers undoable option.
 * `validateArrowEnds(edge, source, target)`  This function gets an edge, and ends of that edge (Optionally it may take just the classes of these elements as well) as parameters.
    It may return 'valid' (that ends is valid for that edge), 'reverse' (that ends is not valid for that edge but they would be valid 
    if you reverse the source and target), 'invalid' (that ends are totally invalid for that edge).
 * `showAndPerformLayout(eles, layoutparam)` Similar to `chise.showAndPerformLayout()` but do not considers undoable option.

`chise.undoRedoActionFunctions`
Functions to be utilized in defining new actions for cytoscape.js-undo-redo extension. These are exposed for the users who builds
an extension library of chise. Extends sbgnviz.undoRedoActionFunctions, you can find the ChiSE extensions for sbgnviz.undoRedoActionFunctions below.

 * `addNode(param)` Do/Redo function for 'addNode' undo redo command.
 * `addEdge(param)` Do/Redo function for 'addEdge' undo redo command.
 * `createCompoundForGivenNodes(param)` Do/Redo function for 'createCompoundForGivenNodes' undo redo command.
 * `removeCompound(param)` Undo function for 'createCompoundForGivenNodes' undo redo command.
 * `createTemplateReaction(param)` Do/Redo function for 'createTemplateReaction' undo redo command.
 * `resizeNodes(param)` Do/Undo/Redo function for 'resizeNodes' undo redo command.
 * `changeNodeLabel(param)` Do/Undo/Redo function for 'changeNodeLabel' undo redo command.
 * `changeData(param)` Do/Undo/Redo function for 'changeData' undo redo command.
 * `changeCss(param)` Do/Undo/Redo function for 'changeCss' undo redo command.
 * `changeFontProperties(param)` Do/Undo/Redo function for 'changeFontProperties' undo redo command.
 * `showAndPerformLayout(param)` Do/Redo function for 'showAndPerformLayout' undo redo command.
 * `undoShowAndPerformLayout(param)` Undo/ function for 'showAndPerformLayout' undo redo command.
 * `changeStateOrInfoBox(param)` Do/Undo/Redo function for 'changeStateOrInfoBox' undo redo command.
 * `addStateOrInfoBox(param)` Do/Redo function for 'addStateOrInfoBox' undo redo command (Also Undo function for 'removeStateOrInfoBox' undo redo command).
 * `removeStateOrInfoBox(param)` Do/Redo function for 'removeStateOrInfoBox' undo redo command (Also Undo function for 'addStateOrInfoBox' undo redo command).
 * `setMultimerStatus(param)` Do/Undo/Redo function for 'setMultimerStatus' undo redo command.
 * `setCloneMarkerStatus(param)` Do/Undo/Redo function for 'setCloneMarkerStatus' undo redo command.

## Events
`$(document).on('sbgnvizLoadSample', function(event, filename) { ... });` Triggered when a sample is being loaded

`$(document).on('sbgnvizLoadFile', function(event, filename) { ... });` Triggered when an external sbgnml file is being loaded

`$(document).on('updateGraphStart', function(event) { ... });` Triggered when the graph update is just started

`$(document).on('updateGraphEnd', function(event) { ... });` Triggered when the graph update is ended

## Dependencies

 * cytoscape (iVis-at-Bilkent/cytoscape.js#unstable)
 * jQuery ^2.2.4
 * filesaverjs ~0.2.2
 * sbgnviz ~3.4.2

## Optional Dependencies
The following extensions are used by this library if they are registered.
 * cytoscape-undo-redo ^1.2.1
 * cytoscape-expand-collapse ^3.0.0
 * cytoscape-edge-bend-editing ^1.4.0
 * cytoscape-view-utilities ^2.0.0


## Usage instructions
Download the library:
 * via npm: `npm install cytoscape-expand-collapse` or
 * via direct download in the repository (probably from a tag).

`require()` the library as appropriate for your project:

CommonJS:
```js
var sbgnviz = require('sbgnviz');
var cytoscape = require('cytoscape-for-sbgnviz');
var jQuery = require('jQuery');
var filesaverjs = require('filesaverjs');
var sbgnviz = require('sbgnviz');

var options = {
};

var libs = {
    cytoscape: cytoscape,
    jQuery: jQuery,
    filesaverjs: filesaverjs,
    sbgnviz: sbgnviz
};

chise( options, libs );
```

In plain JS you do not need to require the libraries you just need to register chise with the options.

## Publishing instructions

This project is set up to automatically be published to npm.  To publish:

1. Set the version number environment variable: `export VERSION=1.2.3`
2. Publish: `gulp publish`

## Credits

Thanks to JetBrains for an [Open Source License](https://www.jetbrains.com/buy/opensource/)

## Team

  * [Metin Can Siper](https://github.com/metincansiper), [Selim Firat Yilmaz](https://github.com/mrsfy), [Ugur Dogrusoz](https://github.com/ugurdogrusoz), and [Alper Karacelik](https://github.com/alperkaracelik) of [i-Vis at Bilkent University](http://www.cs.bilkent.edu.tr/~ivis)

#### Alumni

  * Istemi Bahceci, Mecit Sari, Ayhun Tekat, M.Furkan Sahin