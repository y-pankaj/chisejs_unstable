var setFileContent = function (fileName) {
  var span = document.getElementById('file-name');
  while (span.firstChild) {
    span.removeChild(span.firstChild);
  }
  span.appendChild(document.createTextNode(fileName));
};

var beforePerformLayout = function(){
  var nodes = cy.nodes();
  var edges = cy.edges();
  
  nodes.removeData("ports");
  edges.removeData("portsource");
  edges.removeData("porttarget");

  nodes.data("ports", []);
  edges.data("portsource", []);
  edges.data("porttarget", []);

  edges.removeData('weights');
  edges.removeData('distances');
  edges.removeData('bendPointPositions');
  
  //Clear the segment points in case of they are not updated
  for(var i = 0; i < edges.length; i++){
    edges[i]._private.rscratch.segpts = [];
  }
  
  cy.edges().css('curve-style', 'bezier');
};

//A function to trigger incremental layout. Its definition is inside document.ready()
var triggerIncrementalLayout;

//Handle keyboard events
$(document).keydown(function (e) {
  if (e.ctrlKey) {
    window.ctrlKeyDown = true;
    if (e.which === 90) {
      editorActionsManager.undo();
      refreshUndoRedoButtonsStatus();
//    $(document.activeElement).attr("value");
    }
    else if (e.which === 89) {
      editorActionsManager.redo();
      refreshUndoRedoButtonsStatus();
    }
  }
});

$(document).keyup(function (e) {
  window.ctrlKeyDown = null;
//  $("#sbgn-network-container").removeClass("target-cursor");
  disableDragAndDropMode();
});

$("#node-label-textbox").keydown(function (e) {
  if (e.which === 13) {
    $("#node-label-textbox").blur();
  }
});

$(document).ready(function () {
  var xmlObject = loadXMLDoc('samples/CaM-CaMK_dependent_signaling_to_the_nucleus.xml');

  setFileContent("CaM-CaMK_dependent_signaling_to_the_nucleus.sbgnml");

  (new SBGNContainer({
    el: '#sbgn-network-container',
    model: {cytoscapeJsGraph: sbgnmlToJson.convert(xmlObject)}
  })).render();
    
  document.getElementById("ctx-add-bend-point").addEventListener("contextmenu",function(event){
      event.preventDefault();
  },false);
  
  document.getElementById("ctx-remove-bend-point").addEventListener("contextmenu",function(event){
      event.preventDefault();
  },false);

  $('.ctx-bend-operation').click(function (e) {
    $('.ctx-bend-operation').css('display', 'none');
  });

  $('#ctx-add-bend-point').click(function (e) {
    var edge = sbgnBendPointUtilities.currentCtxEdge;
    var param = {
      edge: edge,
      weights: edge.data('weights')?[].concat(edge.data('weights')):edge.data('weights'),
      distances: edge.data('distances')?[].concat(edge.data('distances')):edge.data('distances')
    };
    
    sbgnBendPointUtilities.addBendPoint();
    editorActionsManager._do(new changeBendPointsCommand(param));
    refreshUndoRedoButtonsStatus();
  });
  
  $('#ctx-remove-bend-point').click(function (e) {
    var edge = sbgnBendPointUtilities.currentCtxEdge;
    var param = {
      edge: edge,
      weights: [].concat(edge.data('weights')),
      distances: [].concat(edge.data('distances'))
    };
    
    sbgnBendPointUtilities.removeBendPoint();
    editorActionsManager._do(new changeBendPointsCommand(param));
    refreshUndoRedoButtonsStatus();
  });

  $('#new-file-icon').click(function (e) {
    $('#new-file').trigger("click");
  });

  $('#new-file').click(function (e) {
    setFileContent("new_file.sbgnml");

    (new SBGNContainer({
      el: '#sbgn-network-container',
      model: {
        cytoscapeJsGraph: {
          nodes: [],
          edges: []
        }
      }
    })).render();

    editorActionsManager.reset();
    handleSBGNInspector();
  });

  $('.add-node-menu-item').click(function (e) {
    if (!modeHandler.mode != "add-node-mode") {
      modeHandler.setAddNodeMode();
    }
    var value = $(this).attr('name');
    modeHandler.selectedNodeType = value;
    modeHandler.setSelectedIndexOfSelector("add-node-mode", value);
    modeHandler.setSelectedMenuItem("add-node-mode", value);
  });

  $('.add-edge-menu-item').click(function (e) {
    if (!modeHandler.mode != "add-edge-mode") {
      modeHandler.setAddEdgeMode();
    }
    var value = $(this).attr('name');
    modeHandler.selectedEdgeType = value;
    modeHandler.setSelectedIndexOfSelector("add-edge-mode", value);
    modeHandler.setSelectedMenuItem("add-edge-mode", value);
  });

  modeHandler.initilize();

  $('.sbgn-select-node-item').click(function (e) {
    if (!modeHandler.mode != "add-node-mode") {
      modeHandler.setAddNodeMode();
    }
    var value = $('img', this).attr('value');
    modeHandler.selectedNodeType = value;
    modeHandler.setSelectedIndexOfSelector("add-node-mode", value);
    modeHandler.setSelectedMenuItem("add-node-mode", value);
  });

  $('.sbgn-select-edge-item').click(function (e) {
    if (!modeHandler.mode != "add-edge-mode") {
      modeHandler.setAddEdgeMode();
    }
    var value = $('img', this).attr('value');
    modeHandler.selectedEdgeType = value;
    modeHandler.setSelectedIndexOfSelector("add-edge-mode", value);
    modeHandler.setSelectedMenuItem("add-edge-mode", value);
  });

  $('#node-list-set-mode-btn').click(function (e) {
    if (modeHandler.mode != "add-node-mode") {
      modeHandler.setAddNodeMode();
    }
  });

  $('#edge-list-set-mode-btn').click(function (e) {
    if (modeHandler.mode != "add-edge-mode") {
      modeHandler.setAddEdgeMode();
    }
  });

  $('#select-icon').click(function (e) {
    modeHandler.setSelectionMode();
  });

  $('#select-edit').click(function (e) {
    modeHandler.setSelectionMode();
  });
  
  $('#clone-selected').click(function (e) {
    var selectedNodes = cy.nodes(':selected');
    var param = {
      eles: selectedNodes,
      firstTime: true
    };
    editorActionsManager._do(new CloneGivenElementsCommand(param));
  });

  $('#align-horizontal-top').click(function (e) {
    var selectedNodes = sbgnElementUtilities.getTopMostNodes(cy.nodes(":selected").filter(":visible"));
    if (selectedNodes.length <= 1) {
      return;
    }
    var nodesData = getNodesData();

    var modelNode = window.firstSelectedNode ? firstSelectedNode : selectedNodes[0];
    var commonTopY = modelNode.position("y") - modelNode.height() / 2;

    for (var i = 0; i < selectedNodes.length; i++) {
      var node = selectedNodes[i];
      var oldPosY = node.position('y');
      var newPosY = commonTopY + node.height() / 2;
      node.position({
        y: newPosY
      });
      sbgnElementUtilities.propogateReplacementToChildren(node, 0, newPosY - oldPosY);
    }

    nodesData.firstTime = true;
    editorActionsManager._do(new ReturnToPositionsAndSizesCommand(nodesData));
  });

  $("#align-horizontal-top-icon").click(function (e) {
    $("#align-horizontal-top").trigger('click');
  });

  $('#align-horizontal-middle').click(function (e) {
    var selectedNodes = sbgnElementUtilities.getTopMostNodes(cy.nodes(":selected").filter(":visible"));
    if (selectedNodes.length <= 1) {
      return;
    }
    var nodesData = getNodesData();

    var modelNode = window.firstSelectedNode ? firstSelectedNode : selectedNodes[0];
    var commonMiddleY = modelNode.position("y");

    for (var i = 0; i < selectedNodes.length; i++) {
      var node = selectedNodes[i];
      var oldPosY = node.position('y');
      var newPosY = commonMiddleY;
      node.position({
        y: newPosY
      });
      sbgnElementUtilities.propogateReplacementToChildren(node, 0, newPosY - oldPosY);
    }

    nodesData.firstTime = true;
    editorActionsManager._do(new ReturnToPositionsAndSizesCommand(nodesData));
  });

  $("#align-horizontal-middle-icon").click(function (e) {
    $("#align-horizontal-middle").trigger('click');
  });

  $('#align-horizontal-bottom').click(function (e) {
    var selectedNodes = sbgnElementUtilities.getTopMostNodes(cy.nodes(":selected").filter(":visible"));
    if (selectedNodes.length <= 1) {
      return;
    }
    var nodesData = getNodesData();

    var modelNode = window.firstSelectedNode ? firstSelectedNode : selectedNodes[0];
    var commonBottomY = modelNode.position("y") + modelNode.height() / 2;

    for (var i = 0; i < selectedNodes.length; i++) {
      var node = selectedNodes[i];
      var oldPosY = node.position('y');
      var newPosY = commonBottomY - node.height() / 2;
      node.position({
        y: newPosY
      });
      sbgnElementUtilities.propogateReplacementToChildren(node, 0, newPosY - oldPosY);
    }

    nodesData.firstTime = true;
    editorActionsManager._do(new ReturnToPositionsAndSizesCommand(nodesData));
  });

  $("#align-horizontal-bottom-icon").click(function (e) {
    $("#align-horizontal-bottom").trigger('click');
  });

  $('#align-vertical-left').click(function (e) {
    var selectedNodes = sbgnElementUtilities.getTopMostNodes(cy.nodes(":selected").filter(":visible"));
    if (selectedNodes.length <= 1) {
      return;
    }
    var nodesData = getNodesData();

    var modelNode = window.firstSelectedNode ? firstSelectedNode : selectedNodes[0];
    var commonLeftX = modelNode.position("x") - modelNode.width() / 2;

    for (var i = 0; i < selectedNodes.length; i++) {
      var node = selectedNodes[i];
      var oldPosX = node.position('x');
      var newPosX = commonLeftX + node.width() / 2;
      node.position({
        x: newPosX
      });
      sbgnElementUtilities.propogateReplacementToChildren(node, newPosX - oldPosX, 0);
    }

    nodesData.firstTime = true;
    editorActionsManager._do(new ReturnToPositionsAndSizesCommand(nodesData));
  });

  $("#align-vertical-left-icon").click(function (e) {
    $("#align-vertical-left").trigger('click');
  });

  $('#align-vertical-center').click(function (e) {
    var selectedNodes = sbgnElementUtilities.getTopMostNodes(cy.nodes(":selected").filter(":visible"));
    if (selectedNodes.length <= 1) {
      return;
    }
    var nodesData = getNodesData();

    var modelNode = window.firstSelectedNode ? firstSelectedNode : selectedNodes[0];
    var commonCenterX = modelNode.position("x");

    for (var i = 0; i < selectedNodes.length; i++) {
      var node = selectedNodes[i];
      var oldPosX = node.position('x');
      var newPosX = commonCenterX
      node.position({
        x: newPosX
      });
      sbgnElementUtilities.propogateReplacementToChildren(node, newPosX - oldPosX, 0);
    }

    nodesData.firstTime = true;
    editorActionsManager._do(new ReturnToPositionsAndSizesCommand(nodesData));
  });

  $("#align-vertical-center-icon").click(function (e) {
    $("#align-vertical-center").trigger('click');
  });

  $('#align-vertical-right').click(function (e) {
    var selectedNodes = sbgnElementUtilities.getTopMostNodes(cy.nodes(":selected").filter(":visible"));
    if (selectedNodes.length <= 1) {
      return;
    }
    var nodesData = getNodesData();

    var modelNode = window.firstSelectedNode ? firstSelectedNode : selectedNodes[0];
    var commonRightX = modelNode.position("x") + modelNode.width() / 2;

    for (var i = 0; i < selectedNodes.length; i++) {
      var node = selectedNodes[i];
      var oldPosX = node.position('x');
      var newPosX = commonRightX - node.width() / 2;
      node.position({
        x: newPosX
      });
      sbgnElementUtilities.propogateReplacementToChildren(node, newPosX - oldPosX, 0);
    }

    nodesData.firstTime = true;
    editorActionsManager._do(new ReturnToPositionsAndSizesCommand(nodesData));
  });

  $("#align-vertical-right-icon").click(function (e) {
    $("#align-vertical-right").trigger('click');
  });

  var sbgnLayoutProp = new SBGNLayout({
    el: '#sbgn-layout-table'
  });

  var sbgnProperties = new SBGNProperties({
    el: '#sbgn-properties-table'
  });
  
  var pathsBetweenQuery = new PathsBetweenQuery({
    el: '#query-pathsbetween-table'
  });
  
  triggerIncrementalLayout = function(){
    beforePerformLayout();

    var preferences = {
      randomize: false,
      animate: sbgnStyleRules['animate-on-drawing-changes'] == 'true'?'end':false,
      fit: false
    };
    
    if(sbgnLayoutProp.currentLayoutProperties.animate == 'during'){
      delete preferences.animate;
    }
    
    sbgnLayoutProp.applyLayout(preferences);
  };

  $("body").on("change", "#file-input", function (e) {
    if ($("#file-input").val() == "") {
      return;
    }

    var fileInput = document.getElementById('file-input');
    var file = fileInput.files[0];
    var textType = /text.*/;

    var reader = new FileReader();

    reader.onload = function (e) {
      (new SBGNContainer({
        el: '#sbgn-network-container',
        model: {cytoscapeJsGraph:
                  sbgnmlToJson.convert(textToXmlObject(this.result))}
      })).render();
    }
    reader.readAsText(file);
    setFileContent(file.name);
    $("#file-input").val("");
  });

  $("#node-legend").click(function (e) {
    e.preventDefault();
    $.fancybox(
            _.template($("#node-legend-template").html(), {}),
            {
              'autoDimensions': false,
              'width': 504,
              'height': 325,
              'transitionIn': 'none',
              'transitionOut': 'none',
            });
  });

  $("#node-label-textbox").blur(function () {
    $("#node-label-textbox").hide();
    $("#node-label-textbox").data('node', undefined);
  });

  $("#node-label-textbox").on('change', function () {
    var node = $(this).data('node');
    var param = {
      nodes: cy.collection(node),
      sbgnlabel: $(this).attr('value'),
      firstTime: true
    };
    editorActionsManager._do(new ChangeNodeLabelCommand(param));
    refreshUndoRedoButtonsStatus();
//    node._private.data.sbgnlabel = $(this).attr('value');
//    cy.forceRender();
  });

  $("#edge-legend").click(function (e) {
    e.preventDefault();
    $.fancybox(
            _.template($("#edge-legend-template").html(), {}),
            {
              'autoDimensions': false,
              'width': 325,
              'height': 285,
              'transitionIn': 'none',
              'transitionOut': 'none',
            });
  });

  $("#quick-help").click(function (e) {
    e.preventDefault();
    $.fancybox(
            _.template($("#quick-help-template").html(), {}),
            {
              'autoDimensions': false,
              'width': 420,
              'height': "auto",
              'transitionIn': 'none',
              'transitionOut': 'none'
            });
  });

  $("#how-to-use").click(function (e) {
    var url = "http://www.cs.bilkent.edu.tr/~ivis/sbgnviz-js/SBGNViz.js-1.x.UG.pdf";
    var win = window.open(url, '_blank');
    win.focus();
  });

  $("#about").click(function (e) {
    e.preventDefault();
    $.fancybox(
            _.template($("#about-template").html(), {}),
            {
              'autoDimensions': false,
              'width': 300,
              'height': 250,
              'transitionIn': 'none',
              'transitionOut': 'none',
            });
  });

  $("#load-sample1").click(function (e) {
    var xmlObject = loadXMLDoc('samples/CaM-CaMK_dependent_signaling_to_the_nucleus.xml');

    setFileContent("CaM-CaMK_dependent_signaling_to_the_nucleus.sbgnml");

    (new SBGNContainer({
      el: '#sbgn-network-container',
      model: {cytoscapeJsGraph: sbgnmlToJson.convert(xmlObject)}
    })).render();
    handleSBGNInspector();
  });

  $("#load-sample2").click(function (e) {
    var xmlObject = loadXMLDoc('samples/activated_stat1alpha_induction_of_the_irf1_gene.xml');

    setFileContent("activated_stat1alpha_induction_of_the_irf1_gene.sbgnml");

    (new SBGNContainer({
      el: '#sbgn-network-container',
      model: {cytoscapeJsGraph: sbgnmlToJson.convert(xmlObject)}
    })).render();
    handleSBGNInspector();
  });

  $("#load-sample3").click(function (e) {
    var xmlObject = loadXMLDoc('samples/glycolysis.xml');

    setFileContent("glycolysis.sbgnml");

    (new SBGNContainer({
      el: '#sbgn-network-container',
      model: {cytoscapeJsGraph: sbgnmlToJson.convert(xmlObject)}
    })).render();

    handleSBGNInspector();
  });

  $("#load-sample4").click(function (e) {
    var xmlObject = loadXMLDoc('samples/mapk_cascade.xml');

    setFileContent("mapk_cascade.sbgnml");

    (new SBGNContainer({
      el: '#sbgn-network-container',
      model: {cytoscapeJsGraph: sbgnmlToJson.convert(xmlObject)}
    })).render();

    handleSBGNInspector();
  });

  $("#load-sample5").click(function (e) {
    var xmlObject = loadXMLDoc('samples/polyq_proteins_interference.xml');

    $("#quick-help").click(function (e) {
      e.preventDefault();
      $.fancybox(
              _.template($("#quick-help-template").html(), {}),
              {
                'autoDimensions': false,
                'width': 420,
                'height': "auto",
                'transitionIn': 'none',
                'transitionOut': 'none'
              });
    });

    setFileContent("polyq_proteins_interference.sbgnml");

    (new SBGNContainer({
      el: '#sbgn-network-container',
      model: {cytoscapeJsGraph: sbgnmlToJson.convert(xmlObject)}
    })).render();

    handleSBGNInspector();
  });

  $("#load-sample6").click(function (e) {
    var xmlObject = loadXMLDoc('samples/insulin-like_growth_factor_signaling.xml');

    setFileContent("insulin-like_growth_factor_signaling.sbgnml");

    (new SBGNContainer({
      el: '#sbgn-network-container',
      model: {cytoscapeJsGraph: sbgnmlToJson.convert(xmlObject)}
    })).render();

    handleSBGNInspector();
  });

  $("#load-sample7").click(function (e) {
    var xmlObject = loadXMLDoc('samples/atm_mediated_phosphorylation_of_repair_proteins.xml');

    setFileContent("atm_mediated_phosphorylation_of_repair_proteins.sbgnml");

    (new SBGNContainer({
      el: '#sbgn-network-container',
      model: {cytoscapeJsGraph: sbgnmlToJson.convert(xmlObject)}
    })).render();

    handleSBGNInspector();
  });

  $("#load-sample8").click(function (e) {
    var xmlObject = loadXMLDoc('samples/vitamins_b6_activation_to_pyridoxal_phosphate.xml');

    setFileContent("vitamins_b6_activation_to_pyridoxal_phosphatesbgnml");

    (new SBGNContainer({
      el: '#sbgn-network-container',
      model: {cytoscapeJsGraph: sbgnmlToJson.convert(xmlObject)}
    })).render();

    handleSBGNInspector();
  });

  $("#hide-selected").click(function (e) {
    var selectedEles = cy.$(":selected");
    
    if(selectedEles.length == 0){
      return;
    }
    
    var param = {};
    param.firstTime = true;
    editorActionsManager._do(new HideSelectedCommand(param));
    refreshUndoRedoButtonsStatus();
  });

  $("#hide-selected-icon").click(function (e) {
    $("#hide-selected").trigger('click');
  });

  $("#show-selected").click(function (e) {
//    sbgnFiltering.showSelected();
    if(cy.nodes(":selected").length == cy.nodes(':visible').length) {
      return;
    }

    var param = {};
    param.firstTime = true;
    editorActionsManager._do(new ShowSelectedCommand(param));
    refreshUndoRedoButtonsStatus();
  });

  $("#show-selected-icon").click(function (e) {
    $("#show-selected").trigger('click');
  });

  $("#show-all").click(function (e) {
//    sbgnFiltering.showAll();
    if(cy.nodes().length == cy.nodes(':visible').length) {
      return;
    }

    editorActionsManager._do(new ShowAllCommand());
    refreshUndoRedoButtonsStatus();
  });

  $("#delete-selected-smart").click(function (e) {
    if(cy.$(":selected").length == 0){
      return;
    }
    
    var param = {
      firstTime: true
    };
    editorActionsManager._do(new DeleteSelectedCommand(param));
    refreshUndoRedoButtonsStatus();
  });

  $("#delete-selected-smart-icon").click(function (e) {
    $("#delete-selected-smart").trigger('click');
  });

  $("#neighbors-of-selected").click(function (e) {
    var elesToHighlight = sbgnFiltering.getNeighborsofSelected();
    var alreadyHighlighted = cy.elements("[highlighted='true']").filter(":visible");
    
    if(elesToHighlight.not(alreadyHighlighted).length == 0)
    {
      return;
    }
    
    var param = {
      firstTime: true,
      elesToHighlight: elesToHighlight
    };
    editorActionsManager._do(new HighlightNeighborsofSelectedCommand(param));
    refreshUndoRedoButtonsStatus();
  });

  $("#highlight-neighbors-of-selected-icon").click(function (e) {
    $("#neighbors-of-selected").trigger('click');
  });

  $("#search-by-label-icon").click(function (e) {
    var text = $("#search-by-label-text-box").val().toLowerCase();
    if (text.length == 0) {
      return;
    }
    cy.nodes().unselect();

    var nodesToSelect = cy.nodes(":visible").filter(function (i, ele) {
      if (ele.data("sbgnlabel") && ele.data("sbgnlabel").toLowerCase().indexOf(text) >= 0) {
        return true;
      }
      return false;
    });

    if (nodesToSelect.length == 0) {
      return;
    }

    nodesToSelect.select();
    var param = {
      firstTime: true
    };

    editorActionsManager._do(new HighlightProcessesOfSelectedCommand(param));
    refreshUndoRedoButtonsStatus();
  });

  $("#search-by-label-text-box").keydown(function (e) {
    if (e.which === 13) {
      $("#search-by-label-icon").trigger('click');
    }
  });

  $("#highlight-search-menu-item").click(function (e) {
    $("#search-by-label-text-box").focus();
  });

  $("#processes-of-selected").click(function (e) {
    var elesToHighlight = sbgnFiltering.getProcessesOfSelected();
    var alreadyHighlighted = cy.elements("[highlighted='true']").filter(":visible");
    
    if(elesToHighlight.not(alreadyHighlighted).length == 0)
    {
      return;
    }
    
    var param = {
      firstTime: true,
      elesToHighlight: elesToHighlight
    };
    editorActionsManager._do(new HighlightProcessesOfSelectedCommand(param));
    refreshUndoRedoButtonsStatus();
  });

  $("#remove-highlights").click(function (e) {
//    sbgnFiltering.removeHighlights();
    if (sbgnFiltering.thereIsNoHighlightedElement()){
      return;
    }
    editorActionsManager._do(new RemoveHighlightsCommand());
    refreshUndoRedoButtonsStatus();
  });

  $('#remove-highlights-icon').click(function (e) {
    $('#remove-highlights').trigger("click");
  });

  $("#make-compound-complex").click(function (e) {
    var selected = cy.nodes(":selected").filter(function (i, element) {
      var sbgnclass = element.data("sbgnclass")
      return isEPNClass(sbgnclass);
    });
    selected = sbgnElementUtilities.getTopMostNodes(selected);
    if (selected.length == 0 || !sbgnElementUtilities.allHaveTheSameParent(selected)) {
      return;
    }
    var param = {
      firstTime: true,
      compundType: "complex",
      nodesToMakeCompound: selected
    };
    editorActionsManager._do(new CreateCompundForSelectedNodesCommand(param));
    refreshUndoRedoButtonsStatus();
  });

  $("#make-compound-compartment").click(function (e) {
    var selected = cy.nodes(":selected");
    selected = sbgnElementUtilities.getTopMostNodes(selected);
    if (selected.length == 0 || !sbgnElementUtilities.allHaveTheSameParent(selected)) {
      return;
    }

    var param = {
      firstTime: true,
      compundType: "compartment",
      nodesToMakeCompound: selected
    };
    editorActionsManager._do(new CreateCompundForSelectedNodesCommand(param));
    refreshUndoRedoButtonsStatus();
  });

  $("#layout-properties").click(function (e) {
    sbgnLayoutProp.render();
  });

  $("#layout-properties-icon").click(function (e) {
    $("#layout-properties").trigger('click');
  });

  $("#delete-selected-simple").click(function (e) {
    var selectedEles = cy.$(":selected");
    
    if(selectedEles.length == 0){
      return;
    }
    
    editorActionsManager._do(new RemoveElesCommand(selectedEles));
    refreshUndoRedoButtonsStatus();
  });

  $("#delete-selected-simple-icon").click(function (e) {
    $("#delete-selected-simple").trigger('click');
  });

  $("#sbgn-properties").click(function (e) {
    sbgnProperties.render();
  });
  
  $("#query-pathsbetween").click(function (e) {
    pathsBetweenQuery.render();
  });

  $("#properties-icon").click(function (e) {
    $("#sbgn-properties").trigger('click');
  });

  $("#collapse-selected").click(function (e) {
    var nodes = cy.nodes(":selected").filter("[expanded-collapsed='expanded']");
    var thereIs = expandCollapseUtilities.thereIsNodeToExpandOrCollapse(nodes, "collapse");

    if (!thereIs) {
      return;
    }

    if (window.rearrangeAfterExpandCollapse == null) {
      window.rearrangeAfterExpandCollapse =
              (sbgnStyleRules['rearrange-after-expand-collapse'] == 'true');
    }
    if (rearrangeAfterExpandCollapse)
      editorActionsManager._do(new CollapseGivenNodesCommand({
        nodes: nodes,
        firstTime: true
      }));
    else
      editorActionsManager._do(new SimpleCollapseGivenNodesCommand(nodes));
    refreshUndoRedoButtonsStatus();
  });
  
  $("#collapse-complexes").click(function (e) {
    var complexes = cy.nodes("[sbgnclass='complex'][expanded-collapsed='expanded']");
    var thereIs = expandCollapseUtilities.thereIsNodeToExpandOrCollapse(complexes, "collapse");

    if (!thereIs) {
      return;
    }

    if (window.rearrangeAfterExpandCollapse == null) {
      window.rearrangeAfterExpandCollapse =
              (sbgnStyleRules['rearrange-after-expand-collapse'] == 'true');
    }
    if (rearrangeAfterExpandCollapse)
      editorActionsManager._do(new CollapseGivenNodesCommand({
        nodes: complexes,
        firstTime: true
      }));
    else
      editorActionsManager._do(new SimpleCollapseGivenNodesCommand(complexes));
    refreshUndoRedoButtonsStatus();
  });

  $("#collapse-selected-icon").click(function (e) {
    if (modeHandler.mode == "selection-mode") {
      $("#collapse-selected").trigger('click');
    }
  });

  $("#expand-selected").click(function (e) {
    var nodes = cy.nodes(":selected").filter("[expanded-collapsed='collapsed']");
    var thereIs = expandCollapseUtilities.thereIsNodeToExpandOrCollapse(nodes, "expand");

    if (!thereIs) {
      return;
    }

    if (window.rearrangeAfterExpandCollapse == null) {
      window.rearrangeAfterExpandCollapse =
              (sbgnStyleRules['rearrange-after-expand-collapse'] == 'true');
    }
    if (rearrangeAfterExpandCollapse)
      editorActionsManager._do(new ExpandGivenNodesCommand({
        nodes: nodes,
        firstTime: true
      }));
    else
      editorActionsManager._do(new SimpleExpandGivenNodesCommand(nodes));
    refreshUndoRedoButtonsStatus();
  });
  
  $("#expand-complexes").click(function (e) {
    var complexes = cy.nodes("[sbgnclass='complex'][expanded-collapsed='collapsed']");
    var thereIs = expandCollapseUtilities.thereIsNodeToExpandOrCollapse(complexes, "expand");

    if (!thereIs) {
      return;
    }

    if (window.rearrangeAfterExpandCollapse == null) {
      window.rearrangeAfterExpandCollapse =
              (sbgnStyleRules['rearrange-after-expand-collapse'] == 'true');
    }
    if (rearrangeAfterExpandCollapse)
      editorActionsManager._do(new ExpandAllNodesCommand({
        nodes: complexes,
        firstTime: true,
        selector: "complex-parent"
      }));
    else
      editorActionsManager._do(new SimpleExpandAllNodesCommand({
        nodes: complexes,
        firstTime: true,
        selector: "complex-parent"
      }));
    refreshUndoRedoButtonsStatus();
  });

  $("#expand-selected-icon").click(function (e) {
    if (modeHandler.mode == "selection-mode") {
      $("#expand-selected").trigger('click');
    }
  });

  $("#collapse-all").click(function (e) {
    var thereIs = expandCollapseUtilities.thereIsNodeToExpandOrCollapse(cy.nodes(":visible"), "collapse");

    if (!thereIs) {
      return;
    }

    if (window.rearrangeAfterExpandCollapse == null) {
      window.rearrangeAfterExpandCollapse =
              (sbgnStyleRules['rearrange-after-expand-collapse'] == 'true');
    }
    if (rearrangeAfterExpandCollapse)
      editorActionsManager._do(new CollapseGivenNodesCommand({
        nodes: cy.nodes(),
        firstTime: true
      }));
    else
      editorActionsManager._do(new SimpleCollapseGivenNodesCommand(cy.nodes()));
    refreshUndoRedoButtonsStatus();
  });

  $("#expand-all").click(function (e) {
    var thereIs = expandCollapseUtilities.thereIsNodeToExpandOrCollapse(cy.nodes(":visible"), "expand");

    if (!thereIs) {
      return;
    }

    if (window.rearrangeAfterExpandCollapse == null) {
      window.rearrangeAfterExpandCollapse =
              (sbgnStyleRules['rearrange-after-expand-collapse'] == 'true');
    }
    if (rearrangeAfterExpandCollapse)
      editorActionsManager._do(new ExpandAllNodesCommand({
        firstTime: true
      }));
    else
      editorActionsManager._do(new SimpleExpandAllNodesCommand({
        firstTime: true
      }));
    refreshUndoRedoButtonsStatus();
  });

  $("#perform-layout-icon").click(function (e) {
    if (modeHandler.mode == "selection-mode") {
      $("#perform-layout").trigger('click');
    }
  });

  $("#perform-layout").click(function (e) {
    var nodesData = getNodesData();

    beforePerformLayout();
    var preferences = {
      animate: sbgnStyleRules['animate-on-drawing-changes'] == 'true'?'end':false
    };
    
    if(sbgnLayoutProp.currentLayoutProperties.animate == 'during'){
      delete preferences.animate;
    }
    
    sbgnLayoutProp.applyLayout(preferences);

    nodesData.firstTime = true;
    editorActionsManager._do(new ReturnToPositionsAndSizesCommand(nodesData));

    refreshUndoRedoButtonsStatus();
  });

  $("#undo-last-action").click(function (e) {
    editorActionsManager.undo();
    refreshUndoRedoButtonsStatus();
  });

  $("#redo-last-action").click(function (e) {
    editorActionsManager.redo();
    refreshUndoRedoButtonsStatus();
  });

  $("#undo-icon").click(function (e) {
    $("#undo-last-action").trigger('click');
  });

  $("#redo-icon").click(function (e) {
    $("#redo-last-action").trigger('click');
  });

  $("#save-as-png").click(function (evt) {
    var pngContent = cy.png({scale: 3, full: true});

    // see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
    function b64toBlob(b64Data, contentType, sliceSize) {
      contentType = contentType || '';
      sliceSize = sliceSize || 512;

      var byteCharacters = atob(b64Data);
      var byteArrays = [];

      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
      }

      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
    }

    // this is to remove the beginning of the pngContent: data:img/png;base64,
    var b64data = pngContent.substr(pngContent.indexOf(",") + 1);

    saveAs(b64toBlob(b64data, "image/png"), "network.png");

    //window.open(pngContent, "_blank");
  });

  $("#save-as-jpg").click(function (evt) {
    var pngContent = cy.jpg({scale: 3, full: true});

    // see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
    function b64toBlob(b64Data, contentType, sliceSize) {
      contentType = contentType || '';
      sliceSize = sliceSize || 512;

      var byteCharacters = atob(b64Data);
      var byteArrays = [];

      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
      }

      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
    }

    // this is to remove the beginning of the pngContent: data:img/png;base64,
    var b64data = pngContent.substr(pngContent.indexOf(",") + 1);

    saveAs(b64toBlob(b64data, "image/jpg"), "network.jpg");
  });

  $("#load-file").click(function (evt) {
    $("#file-input").trigger('click');
  });

  $("#load-file-icon").click(function (evt) {
    $("#load-file").trigger('click');
  });

  $("#save-as-sbgnml").click(function (evt) {
    var sbgnmlText = jsonToSbgnml.createSbgnml();

    var blob = new Blob([sbgnmlText], {
      type: "text/plain;charset=utf-8;",
    });
    var filename = document.getElementById('file-name').innerHTML;
    saveAs(blob, filename);
  });

  $("#save-icon").click(function (evt) {
    $("#save-as-sbgnml").trigger('click');
  });

  $("body").on("click", ".biogene-info .expandable", function (evt) {
    var expanderOpts = {slicePoint: 150,
      expandPrefix: ' ',
      expandText: ' (...)',
      userCollapseText: ' (show less)',
      moreClass: 'expander-read-more',
      lessClass: 'expander-read-less',
      detailClass: 'expander-details',
      expandEffect: 'fadeIn',
      collapseEffect: 'fadeOut'
    };

    $(".biogene-info .expandable").expander(expanderOpts);
    expanderOpts.slicePoint = 2;
    expanderOpts.widow = 0;
  });
});
