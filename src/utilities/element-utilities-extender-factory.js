// Extends sbgnviz.elementUtilities
var libs = require('./lib-utilities').getLibs();
var jQuery = $ = libs.jQuery;

module.exports = function () {
  var options, sbgnvizInstance, elementUtilities, cy;

  function elementUtilitiesExtender (param) {
    sbgnvizInstance = param.sbgnvizInstanceUtilities.getInstance();
    options = param.optionUtilities.getOptions();
    elementUtilities = sbgnvizInstance.elementUtilities;
    cy = param.sbgnvizInstanceUtilities.getCy();

    extend();

    // Return the extended elementUtilities
    return elementUtilities;
  }

  // Extends elementUtilities with chise specific facilities
  function extend () {
    elementUtilities.mapType = undefined; // initialize map type

    elementUtilities.PD = {}; // namespace for all PD specific stuff
    elementUtilities.AF = {}; // namespace for all AF specific stuff

    elementUtilities.defaultProperties = {
      "process": {
        width: 20,
        height: 20,
        'background-color': '#ffffff',
        'background-opacity': 0.5,
        'border-width': 1.25,
        'border-color': '#555'
      },
      "omitted process": {
        width: 20,
        height: 20,
        'background-color': '#ffffff',
        'background-opacity': 0.5,
        'border-width': 1.25,
        'border-color': '#555'
      },
      "uncertain process": {
        width: 20,
        height: 20,
        'background-color': '#ffffff',
        'background-opacity': 0.5,
        'border-width': 1.25,
        'border-color': '#555'
      },
      "association": {
        width: 20,
        height: 20,
        'background-color': '#707070',
        'background-opacity': 0.5,
        'border-width': 1.25,
        'border-color': '#555'
      },
      "dissociation": {
        width: 20,
        height: 20,
        'background-color': '#ffffff',
        'background-opacity': 0.5,
        'border-width': 1.25,
        'border-color': '#555'
      },
      "macromolecule": {
        width: 60,
        height: 30,
        'font-size': 11,
        'font-family': 'Helvetica',
        'font-style': 'normal',
        'font-weight': 'normal',
        'color': '#000',
        'background-color': '#ffffff',
        'background-opacity': 0.5,
        'border-width': 1.25,
        'border-color': '#555',
        'text-wrap': 'wrap'
      },
      "nucleic acid feature": {
        width: 60,
        height: 30,
        'font-size': 11,
        'font-family': 'Helvetica',
        'font-style': 'normal',
        'font-weight': 'normal',
        'color': '#000',
        'background-color': '#ffffff',
        'background-opacity': 0.5,
        'border-width': 1.25,
        'border-color': '#555',
        'text-wrap': 'wrap'
      },
      "simple chemical": {
        width: 30,
        height: 30,
        'font-size': 11,
        'font-family': 'Helvetica',
        'font-style': 'normal',
        'font-weight': 'normal',
        'color': '#000',
        'background-color': '#ffffff',
        'background-opacity': 0.5,
        'border-width': 1.25,
        'border-color': '#555',
        'text-wrap': 'wrap'
      },
      "source and sink": {
        width: 22,
        height: 22,
        'font-size': 11,
        'font-family': 'Helvetica',
        'font-style': 'normal',
        'font-weight': 'normal',
        'color': '#000',
        'background-color': '#ffffff',
        'background-opacity': 0.5,
        'border-width': 1.25,
        'border-color': '#555',
        'text-wrap': 'wrap'
      },
      "tag": {
        width: 30,
        height: 30,
        'font-size': 11,
        'font-family': 'Helvetica',
        'font-style': 'normal',
        'font-weight': 'normal',
        'color': '#000',
        'background-color': '#ffffff',
        'background-opacity': 0.5,
        'border-width': 1.25,
        'border-color': '#555',
        'text-wrap': 'wrap'
      },
      "phenotype": {
        width: 60,
        height: 30,
        'font-size': 11,
        'font-family': 'Helvetica',
        'font-style': 'normal',
        'font-weight': 'normal',
        'color': '#000',
        'background-color': '#ffffff',
        'background-opacity': 0.5,
        'border-width': 1.25,
        'border-color': '#555',
        'text-wrap': 'wrap'
      },
      "unspecified entity": {
        width: 60,
        height: 30,
        'font-size': 11,
        'font-family': 'Helvetica',
        'font-style': 'normal',
        'font-weight': 'normal',
        'color': '#000',
        'background-color': '#ffffff',
        'background-opacity': 0.5,
        'border-width': 1.25,
        'border-color': '#555',
        'text-wrap': 'wrap'
      },
      "perturbing agent": {
        width: 60,
        height: 30,
        'font-size': 11,
        'font-family': 'Helvetica',
        'font-style': 'normal',
        'font-weight': 'normal',
        'color': '#000',
        'background-color': '#ffffff',
        'background-opacity': 0.5,
        'border-width': 1.25,
        'border-color': '#555',
        'text-wrap': 'wrap'
      },
      "complex": {
        width: 44,
        height: 44,
        'font-size': 11,
        'font-family': 'Helvetica',
        'font-style': 'normal',
        'font-weight': 'normal',
        'color': '#000',
        'background-color': '#ffffff',
        'background-opacity': 0.5,
        'border-width': 1.25,
        'border-color': '#555',
        'text-wrap': 'wrap'
      },
      "compartment": {
        width: 80,
        height: 80,
        'font-size': 14,
        'font-family': 'Helvetica',
        'font-style': 'normal',
        'font-weight': 'normal',
        'color': '#000',
        'background-color': '#ffffff',
        'background-opacity': 0.5,
        'border-width': 3.25,
        'border-color': '#555',
        'text-wrap': 'wrap'
      },
      "and": {
        width: 30,
        height: 30,
        'background-color': '#ffffff',
        'background-opacity': 0.5,
        'border-width': 1.25,
        'border-color': '#555'
      },
      "or": {
        width: 30,
        height: 30,
        'background-color': '#ffffff',
        'background-opacity': 0.5,
        'border-width': 1.25,
        'border-color': '#555'
      },
      "not": {
        width: 30,
        height: 30,
        'background-color': '#ffffff',
        'background-opacity': 0.5,
        'border-width': 1.25,
        'border-color': '#555'
      },
      "consumption": {
        'line-color': '#555',
        'width': 1.25
      },
      "production": {
        'line-color': '#555',
        'width': 1.25
      },
      "modulation": {
        'line-color': '#555',
        'width': 1.25
      },
      "stimulation": {
        'line-color': '#555',
        'width': 1.25
      },
      "catalysis": {
        'line-color': '#555',
        'width': 1.25
      },
      "inhibition": {
        'line-color': '#555',
        'width': 1.25
      },
      "necessary stimulation": {
        'line-color': '#555',
        'width': 1.25
      },
      "logic arc": {
        'line-color': '#555',
        'width': 1.25
      },
      "equivalence arc": {
        'line-color': '#555',
        'width': 1.25
      },
      "biological activity": {
        width: 60,
        height: 30,
        'font-size': 11,
        'font-family': 'Helvetica',
        'font-style': 'normal',
        'font-weight': 'normal',
        'color': '#000',
        'background-color': '#ffffff',
        'background-opacity': 0.5,
        'border-width': 1.25,
        'border-color': '#555',
        'text-wrap': 'wrap'
      },
      "BA plain": {
        width: 60,
        height: 30,
        'font-size': 11,
        'font-family': 'Helvetica',
        'font-style': 'normal',
        'font-weight': 'normal',
        'color': '#000',
        'background-color': '#ffffff',
        'background-opacity': 0.5,
        'border-width': 1.25,
        'border-color': '#555',
        'text-wrap': 'wrap'
      },
      "BA unspecified entity": {
        width: 60,
        height: 30,
        'font-size': 11,
        'font-family': 'Helvetica',
        'font-style': 'normal',
        'font-weight': 'normal',
        'color': '#000',
        'background-color': '#ffffff',
        'background-opacity': 0.5,
        'border-width': 1.25,
        'border-color': '#555',
        'text-wrap': 'wrap'
      },
      "BA simple chemical": {
        width: 60,
        height: 30,
        'font-size': 11,
        'font-family': 'Helvetica',
        'font-style': 'normal',
        'font-weight': 'normal',
        'color': '#000',
        'background-color': '#ffffff',
        'background-opacity': 0.5,
        'border-width': 1.25,
        'border-color': '#555',
        'text-wrap': 'wrap'
      },
      "BA macromolecule": {
        width: 60,
        height: 30,
        'font-size': 11,
        'font-family': 'Helvetica',
        'font-style': 'normal',
        'font-weight': 'normal',
        'color': '#000',
        'background-color': '#ffffff',
        'background-opacity': 0.5,
        'border-width': 1.25,
        'border-color': '#555',
        'text-wrap': 'wrap'
      },
      "BA nucleic acid feature": {
        width: 60,
        height: 30,
        'font-size': 11,
        'font-family': 'Helvetica',
        'font-style': 'normal',
        'font-weight': 'normal',
        'color': '#000',
        'background-color': '#ffffff',
        'background-opacity': 0.5,
        'border-width': 1.25,
        'border-color': '#555',
        'text-wrap': 'wrap'
      },
      "BA perturbing agent": {
        width: 60,
        height: 30,
        'font-size': 11,
        'font-family': 'Helvetica',
        'font-style': 'normal',
        'font-weight': 'normal',
        'color': '#000',
        'background-color': '#ffffff',
        'background-opacity': 0.5,
        'border-width': 1.25,
        'border-color': '#555',
        'text-wrap': 'wrap'
      },
      "BA complex": {
        width: 60,
        height: 30,
        'font-size': 11,
        'font-family': 'Helvetica',
        'font-style': 'normal',
        'font-weight': 'normal',
        'color': '#000',
        'background-color': '#ffffff',
        'background-opacity': 0.5,
        'border-width': 1.25,
        'border-color': '#555',
        'text-wrap': 'wrap'
      },
      "delay": {
        width: 30,
        height: 30,
        'font-family': 'Cambria',
        'background-color': '#ffffff',
        'background-opacity': 0.5,
        'border-width': 1.25,
        'border-color': '#555'
      },
      "unknown influence": {
        'line-color': '#555',
        'width': 1.25
      },
      "positive influence": {
        'line-color': '#555',
        'width': 1.25
      },
      "negative influence": {
        'line-color': '#555',
        'width': 1.25
      },
      "submap": {
        width: 80,
        height: 80,
        'font-size': 14,
        'font-family': 'Helvetica',
        'font-style': 'normal',
        'font-weight': 'normal',
        'color': '#000',
        'background-color': '#ffffff',
        'background-opacity': 0.5,
        'border-width': 2.25,
        'border-color': '#555',
        'text-wrap': 'wrap',
      },
    };


    /*
      see http://journal.imbio.de/articles/pdf/jib-263.pdf p.41 <-- but beware, outdated
      following tables have been updated with PD lvl1 v2.0 of November 7, 2016 working draft
      only the following things have been changed from 2.0 (this version is not clear on connectivity):
       - empty set has no limit on its edge count
       - logic operators can be source and target
       - limit of 1 catalysis and 1 necessary stimulation on a process

      for each edge class and nodeclass define 2 cases:
       - node can be a source of this edge -> asSource
       - node can be a target of this edge -> asTarget
      for both cases, tells if it is allowed and what is the limit of edges allowed.
      Limits can concern only this type of edge (maxEdge) or the total number of edges for this node (maxTotal).
      Consider undefined things as false/unallowed -> whitelist behavior.

      the nodes/edges class listed below are those used in the program.
      For instance "compartment" isn't a node in SBGN specs.
    */
    elementUtilities.PD.connectivityConstraints = {
      "consumption": {
        "macromolecule":        {asSource: {isAllowed: true},    asTarget: {}},
        "simple chemical":      {asSource: {isAllowed: true},    asTarget: {}},
        "unspecified entity":   {asSource: {isAllowed: true},    asTarget: {}},
        "complex":              {asSource: {isAllowed: true},    asTarget: {}},
        "nucleic acid feature": {asSource: {isAllowed: true},    asTarget: {}},
        "compartment":          {asSource: {},   asTarget: {}},
        "tag":                  {asSource: {},   asTarget: {}},
        "source and sink":      {asSource: {isAllowed: true},    asTarget: {}},
        "perturbing agent":     {asSource: {},   asTarget: {}},
        "submap":               {asSource: {},   asTarget: {}},
        "process":              {asSource: {},   asTarget: {isAllowed: true}},
        "omitted process":      {asSource: {},   asTarget: {isAllowed: true}},
        "uncertain process":    {asSource: {},   asTarget: {isAllowed: true}},
        "phenotype":            {asSource: {},   asTarget: {}},
        "association":          {asSource: {},   asTarget: {isAllowed: true}},
        "dissociation":         {asSource: {},   asTarget: {isAllowed: true, maxEdge: 1, maxTotal: 1}},
        "and":                  {asSource: {},   asTarget: {}},
        "or":                   {asSource: {},   asTarget: {}},
        "not":                  {asSource: {},   asTarget: {}}
      },
      "production": {
        "macromolecule":        {asSource: {},   asTarget: {isAllowed: true}},
        "simple chemical":      {asSource: {},   asTarget: {isAllowed: true}},
        "unspecified entity":   {asSource: {},   asTarget: {isAllowed: true}},
        "complex":              {asSource: {},   asTarget: {isAllowed: true}},
        "nucleic acid feature": {asSource: {},   asTarget: {isAllowed: true}},
        "compartment":          {asSource: {},   asTarget: {}},
        "tag":                  {asSource: {},   asTarget: {}},
        "source and sink":      {asSource: {},   asTarget: {isAllowed: true}},
        "perturbing agent":     {asSource: {},   asTarget: {}},
        "submap":               {asSource: {},   asTarget: {}},
        "process":              {asSource: {isAllowed: true},    asTarget: {}},
        "omitted process":      {asSource: {isAllowed: true},    asTarget: {}},
        "uncertain process":    {asSource: {isAllowed: true},    asTarget: {}},
        "phenotype":            {asSource: {},   asTarget: {}},
        "association":          {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},      asTarget: {}},
        "dissociation":         {asSource: {isAllowed: true},    asTarget: {}},
        "and":                  {asSource: {},   asTarget: {}},
        "or":                   {asSource: {},   asTarget: {}},
        "not":                  {asSource: {},   asTarget: {}}
      },
      "modulation": {
        "macromolecule":        {asSource: {isAllowed: true},    asTarget: {}},
        "simple chemical":      {asSource: {isAllowed: true},    asTarget: {}},
        "unspecified entity":   {asSource: {isAllowed: true},    asTarget: {}},
        "complex":              {asSource: {isAllowed: true},    asTarget: {}},
        "nucleic acid feature": {asSource: {isAllowed: true},    asTarget: {}},
        "compartment":          {asSource: {},   asTarget: {}},
        "tag":                  {asSource: {},   asTarget: {}},
        "source and sink":      {asSource: {isAllowed: true},    asTarget: {}},
        "perturbing agent":     {asSource: {isAllowed: true},    asTarget: {}},
        "submap":               {asSource: {},   asTarget: {}},
        "process":              {asSource: {},   asTarget: {isAllowed: true}},
        "omitted process":      {asSource: {},   asTarget: {isAllowed: true}},
        "uncertain process":    {asSource: {},   asTarget: {isAllowed: true}},
        "phenotype":            {asSource: {},   asTarget: {isAllowed: true}},
        "association":          {asSource: {},   asTarget: {}},
        "dissociation":         {asSource: {},   asTarget: {}},
        "and":                  {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},      asTarget: {}},
        "or":                   {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},      asTarget: {}},
        "not":                  {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},      asTarget: {}}
      },
      "stimulation": {
        "macromolecule":        {asSource: {isAllowed: true},    asTarget: {}},
        "simple chemical":      {asSource: {isAllowed: true},    asTarget: {}},
        "unspecified entity":   {asSource: {isAllowed: true},    asTarget: {}},
        "complex":              {asSource: {isAllowed: true},    asTarget: {}},
        "nucleic acid feature": {asSource: {isAllowed: true},    asTarget: {}},
        "compartment":          {asSource: {},   asTarget: {}},
        "tag":                  {asSource: {},   asTarget: {}},
        "source and sink":      {asSource: {isAllowed: true},    asTarget: {}},
        "perturbing agent":     {asSource: {isAllowed: true},    asTarget: {}},
        "submap":               {asSource: {},   asTarget: {}},
        "process":              {asSource: {},   asTarget: {isAllowed: true}},
        "omitted process":      {asSource: {},   asTarget: {isAllowed: true}},
        "uncertain process":    {asSource: {},   asTarget: {isAllowed: true}},
        "phenotype":            {asSource: {},   asTarget: {isAllowed: true}},
        "association":          {asSource: {},   asTarget: {}},
        "dissociation":         {asSource: {},   asTarget: {}},
        "and":                  {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},      asTarget: {}},
        "or":                   {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},      asTarget: {}},
        "not":                  {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},      asTarget: {}}
      },
      "catalysis": {
        "macromolecule":        {asSource: {isAllowed: true},    asTarget: {}},
        "simple chemical":      {asSource: {isAllowed: true},    asTarget: {}},
        "unspecified entity":   {asSource: {isAllowed: true},    asTarget: {}},
        "complex":              {asSource: {isAllowed: true},    asTarget: {}},
        "nucleic acid feature": {asSource: {},   asTarget: {}},
        "compartment":          {asSource: {},   asTarget: {}},
        "tag":                  {asSource: {},   asTarget: {}},
        "source and sink":      {asSource: {isAllowed: true},    asTarget: {}},
        "perturbing agent":     {asSource: {},   asTarget: {}},
        "submap":               {asSource: {},   asTarget: {}},
        "process":              {asSource: {},   asTarget: {isAllowed: true, maxEdge: 1}},
        "omitted process":      {asSource: {},   asTarget: {isAllowed: true, maxEdge: 1}},
        "uncertain process":    {asSource: {},   asTarget: {isAllowed: true, maxEdge: 1}},
        "phenotype":            {asSource: {},   asTarget: {isAllowed: true, maxEdge: 1}},
        "association":          {asSource: {},   asTarget: {}},
        "dissociation":         {asSource: {},   asTarget: {}},
        "and":                  {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},      asTarget: {}},
        "or":                   {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},      asTarget: {}},
        "not":                  {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},      asTarget: {}}
      },
      "inhibition": {
        "macromolecule":        {asSource: {isAllowed: true},    asTarget: {}},
        "simple chemical":      {asSource: {isAllowed: true},    asTarget: {}},
        "unspecified entity":   {asSource: {isAllowed: true},    asTarget: {}},
        "complex":              {asSource: {isAllowed: true},    asTarget: {}},
        "nucleic acid feature": {asSource: {isAllowed: true},    asTarget: {}},
        "compartment":          {asSource: {},   asTarget: {}},
        "tag":                  {asSource: {},   asTarget: {}},
        "source and sink":      {asSource: {isAllowed: true},    asTarget: {}},
        "perturbing agent":     {asSource: {isAllowed: true},    asTarget: {}},
        "submap":               {asSource: {},   asTarget: {}},
        "process":              {asSource: {},   asTarget: {isAllowed: true}},
        "omitted process":      {asSource: {},   asTarget: {isAllowed: true}},
        "uncertain process":    {asSource: {},   asTarget: {isAllowed: true}},
        "phenotype":            {asSource: {},   asTarget: {isAllowed: true}},
        "association":          {asSource: {},   asTarget: {}},
        "dissociation":         {asSource: {},   asTarget: {}},
        "and":                  {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},      asTarget: {}},
        "or":                   {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},      asTarget: {}},
        "not":                  {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},      asTarget: {}}
      },
      "necessary stimulation": {
        "macromolecule":        {asSource: {isAllowed: true},    asTarget: {}},
        "simple chemical":      {asSource: {isAllowed: true},    asTarget: {}},
        "unspecified entity":   {asSource: {isAllowed: true},    asTarget: {}},
        "complex":              {asSource: {isAllowed: true},    asTarget: {}},
        "nucleic acid feature": {asSource: {isAllowed: true},    asTarget: {}},
        "compartment":          {asSource: {},   asTarget: {}},
        "tag":                  {asSource: {},   asTarget: {}},
        "source and sink":      {asSource: {isAllowed: true},    asTarget: {}},
        "perturbing agent":     {asSource: {isAllowed: true},    asTarget: {}},
        "submap":               {asSource: {},   asTarget: {}},
        "process":              {asSource: {},   asTarget: {isAllowed: true, maxEdge: 1}},
        "omitted process":      {asSource: {},   asTarget: {isAllowed: true, maxEdge: 1}},
        "uncertain process":    {asSource: {},   asTarget: {isAllowed: true, maxEdge: 1}},
        "phenotype":            {asSource: {},   asTarget: {isAllowed: true, maxEdge: 1}},
        "association":          {asSource: {},   asTarget: {}},
        "dissociation":         {asSource: {},   asTarget: {}},
        "and":                  {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},      asTarget: {}},
        "or":                   {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},      asTarget: {}},
        "not":                  {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},      asTarget: {}},
      },
      "logic arc": {
        "macromolecule":        {asSource: {isAllowed: true},    asTarget: {}},
        "simple chemical":      {asSource: {isAllowed: true},    asTarget: {}},
        "unspecified entity":   {asSource: {isAllowed: true},    asTarget: {}},
        "complex":              {asSource: {isAllowed: true},    asTarget: {}},
        "nucleic acid feature": {asSource: {isAllowed: true},    asTarget: {}},
        "compartment":          {asSource: {},   asTarget: {}},
        "tag":                  {asSource: {},   asTarget: {}},
        "source and sink":      {asSource: {isAllowed: true},    asTarget: {}},
        "perturbing agent":     {asSource: {},   asTarget: {}},
        "submap":               {asSource: {},   asTarget: {}},
        "process":              {asSource: {},   asTarget: {}},
        "omitted process":      {asSource: {},   asTarget: {}},
        "uncertain process":    {asSource: {},   asTarget: {}},
        "phenotype":            {asSource: {},   asTarget: {}},
        "association":          {asSource: {},   asTarget: {}},
        "dissociation":         {asSource: {},   asTarget: {}},
        "and":                  {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},      asTarget: {isAllowed: true}},
        "or":                   {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},      asTarget: {isAllowed: true}},
        "not":                  {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},      asTarget: {isAllowed: true, maxEdge: 1, maxTotal: 1}},
      },
      "equivalence arc": {
        "macromolecule":        {asSource: {isAllowed: true},   asTarget: {}},
        "simple chemical":      {asSource: {isAllowed: true},   asTarget: {}},
        "unspecified entity":   {asSource: {isAllowed: true},   asTarget: {}},
        "complex":              {asSource: {isAllowed: true},   asTarget: {}},
        "nucleic acid feature": {asSource: {isAllowed: true},   asTarget: {}},
        "compartment":          {asSource: {},   asTarget: {}},
        "tag":                  {asSource: {},   asTarget: {isAllowed: true}},
        "source and sink":      {asSource: {},   asTarget: {}},
        "perturbing agent":     {asSource: {},   asTarget: {}},
        "submap":               {asSource: {},   asTarget: {isAllowed: true}},
        "process":              {asSource: {},   asTarget: {}},
        "omitted process":      {asSource: {},   asTarget: {}},
        "uncertain process":    {asSource: {},   asTarget: {}},
        "phenotype":            {asSource: {},   asTarget: {}},
        "association":          {asSource: {},   asTarget: {}},
        "dissociation":         {asSource: {},   asTarget: {}},
        "and":                  {asSource: {},   asTarget: {}},
        "or":                   {asSource: {},   asTarget: {}},
        "not":                  {asSource: {},   asTarget: {}}
      }
    };

    /* AF node connectivity rules
     * See: Systems Biology Graphical Notation: Activity Flow language Level 1, Version 1.2, Date: July 27, 2015
     *   Section 3.3.1: Activity Nodes connectivity definition
     *   URL: https://doi.org/10.2390/biecoll-jib-2015-265
     */
    elementUtilities.AF.connectivityConstraints = {
      "positive influence": {
        "biological activity":  {asSource: {isAllowed: true},   asTarget: {isAllowed: true}},
        "phenotype":            {asSource: {},   asTarget: {isAllowed: true}},
        "tag":                  {asSource: {},   asTarget: {}},
        "submap":               {asSource: {},   asTarget: {}},
        "and":                  {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},   asTarget: {}},
        "or":                   {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},   asTarget: {}},
        "not":                  {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},   asTarget: {}},
        "delay":                {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},   asTarget: {}},
        "compartment":          {asSource: {},   asTarget: {}},
      },
      "negative influence": {
        "biological activity":  {asSource: {isAllowed: true},   asTarget: {isAllowed: true}},
        "phenotype":            {asSource: {},   asTarget: {isAllowed: true}},
        "tag":                  {asSource: {},   asTarget: {}},
        "submap":               {asSource: {},   asTarget: {}},
        "and":                  {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},   asTarget: {}},
        "or":                   {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},   asTarget: {}},
        "not":                  {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},   asTarget: {}},
        "delay":                {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},   asTarget: {}},
        "compartment":          {asSource: {},   asTarget: {}},
      },
      "unknown influence": {
        "biological activity":  {asSource: {isAllowed: true},   asTarget: {isAllowed: true}},
        "phenotype":            {asSource: {},   asTarget: {isAllowed: true}},
        "tag":                  {asSource: {},   asTarget: {}},
        "submap":               {asSource: {},   asTarget: {}},
        "and":                  {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},   asTarget: {}},
        "or":                   {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},   asTarget: {}},
        "not":                  {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},   asTarget: {}},
        "delay":                {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},   asTarget: {}},
        "compartment":          {asSource: {},   asTarget: {}},
      },
      "necessary stimulation": {
        "biological activity":  {asSource: {isAllowed: true},   asTarget: {isAllowed: true}},
        "phenotype":            {asSource: {},   asTarget: {isAllowed: true}},
        "tag":                  {asSource: {},   asTarget: {}},
        "submap":               {asSource: {},   asTarget: {}},
        "and":                  {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},   asTarget: {}},
        "or":                   {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},   asTarget: {}},
        "not":                  {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},   asTarget: {}},
        "delay":                {asSource: {isAllowed: true, maxEdge: 1, maxTotal: 1},   asTarget: {}},
        "compartment":          {asSource: {},   asTarget: {}},
      },
      "logic arc": {
        "biological activity":  {asSource: {isAllowed: true},   asTarget: {}},
        "phenotype":            {asSource: {},   asTarget: {}},
        "tag":                  {asSource: {},   asTarget: {}},
        "submap":               {asSource: {},   asTarget: {}},
        "and":                  {asSource: {},   asTarget: {isAllowed: true}},
        "or":                   {asSource: {},   asTarget: {isAllowed: true}},
        "not":                  {asSource: {},   asTarget: {isAllowed: true, maxEdge: 1, maxTotal: 1}},
        "delay":                {asSource: {},   asTarget: {isAllowed: true, maxEdge: 1, maxTotal: 1}},
        "compartment":          {asSource: {},   asTarget: {}},
      },
      "equivalence arc": {
        "biological activity":  {asSource: {isAllowed: true},   asTarget: {}},
        "phenotype":            {asSource: {isAllowed: true},   asTarget: {}},
        "tag":                  {asSource: {},   asTarget: {isAllowed: true}},
        "submap":               {asSource: {},   asTarget: {isAllowed: true}},
        "and":                  {asSource: {},   asTarget: {}},
        "or":                   {asSource: {},   asTarget: {}},
        "not":                  {asSource: {},   asTarget: {}},
        "delay":                {asSource: {},   asTarget: {}},
        "compartment":          {asSource: {},   asTarget: {}},
      },
    }

    // Section Start
    // Add remove utilities

    // see http://stackoverflow.com/a/8809472
    // we need to take care of our own IDs because the ones automatically generated by cytoscape (also UUID)
    // don't comply with xsd:SID type that must not begin with a number
    function generateUUID () { // Public Domain/MIT
        var d = Date.now();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    elementUtilities.addNode = function (x, y, nodeParams, id, parent, visibility) {
      if (typeof nodeParams != 'object'){
        var sbgnclass = nodeParams;
      } else {
          var sbgnclass = nodeParams.class;
          var language = nodeParams.language;
      }
      var defaultProperties = this.defaultProperties;
      var defaults = defaultProperties[sbgnclass];

      var width = defaults ? defaults.width : 50;
      var height = defaults ? defaults.height : 50;

      var css = {};


      if (visibility) {
        css.visibility = visibility;
      }

      if (defaults && defaults.multimer) {
        sbgnclass += " multimer";
      }
      var data = {
        class: sbgnclass,
    	language: language,
        bbox: {
          h: height,
          w: width,
          x: x,
          y: y
        },
        statesandinfos: [],
        ports: [],
        clonemarker: defaults && defaults.clonemarker ? defaults.clonemarker : undefined,
        init: true
      };

      if(id) {
        data.id = id;
      }
      else {
        data.id = "nwtN_" + generateUUID();
      }

      if (parent) {
        data.parent = parent;
      }

      var eles = cy.add({
        group: "nodes",
        data: data,
        css: css,
        position: {
          x: x,
          y: y
        }
      });

      var newNode = eles[eles.length - 1];
      var ordering = this.defaultProperties[sbgnclass.replace(/\s*multimer$/, '')]['ports-ordering']; // Get the default ports ordering for the nodes with given sbgnclass

      // If there is a default ports ordering for the nodes with given sbgnclass and it is different than 'none' set the ports ordering to that ordering
      if (ordering && ordering !== 'none') {
        this.setPortsOrdering(newNode, ordering);
      }

      if (language == "AF" && !elementUtilities.canHaveMultipleUnitOfInformation(newNode)){
        if (sbgnclass != "BA plain") { // if AF node can have label i.e: not plain biological activity
          var uoi_obj = {
            clazz: "unit of information"
          };
          uoi_obj.label = {
            text: ""
          };

          uoi_obj.bbox = {
             w: 12,
             h: 12
          };
          elementUtilities.addStateOrInfoBox(newNode, uoi_obj);
        }
      }

      return newNode;
    };

    //Saves old aux units of given node
    elementUtilities.saveUnits = function(node) {
      var tempData = [];
      var index = 0;
      node.data('statesandinfos').forEach( function(ele) {
        tempData.push({
          x: ele.bbox.x,
          y: ele.bbox.y,
          anchorSide: ele.anchorSide,
        });
        index++;
      });
      return tempData;
    };

    //Restores from given data
    elementUtilities.restoreUnits = function(node, data) {
      var index = 0;
      node.data('statesandinfos').forEach( function(ele) {
        if (data !== undefined) {
          ele.bbox.x = data[index].x;
          ele.bbox.y = data[index].y
          var anchorSide = ele.anchorSide;
          ele.anchorSide = data[index].anchorSide;
          elementUtilities.modifyUnits(node, ele, anchorSide);
          index++;
        }
      });
    };

    //Modify aux unit layouts
    elementUtilities.modifyUnits = function (node, ele, anchorSide) {
      instance.classes.AuxUnitLayout.modifyUnits(node, ele, anchorSide, cy);
    };


    //For reversible reactions both side of the process can be input/output
    //Group ID identifies to which group of nodes the edge is going to be connected for reversible reactions(0: group 1 ID and 1:group 2 ID)
    elementUtilities.addEdge = function (source, target, edgeParams, id, visibility, groupID ) {
      if (typeof edgeParams != 'object'){
        var sbgnclass = edgeParams;
      } else {
          var sbgnclass = edgeParams.class;
          var language = edgeParams.language;
      }
      var defaultProperties = elementUtilities.defaultProperties;
      var defaults = defaultProperties[sbgnclass];

      var css = {};

      if (visibility) {
        css.visibility = visibility;
      }

      var data = {
          source: source,
          target: target,
          class: sbgnclass,
          language: language,
      };

      if(id) {
        data.id = id;
      }
      else {
        data.id = "nwtE_" + generateUUID();
      }

      if(elementUtilities.canHaveSBGNCardinality(sbgnclass)){
        data.cardinality = 0;
      }

      var sourceNode = cy.getElementById(source); // The original source node
      var targetNode = cy.getElementById(target); // The original target node
      var sourceHasPorts = sourceNode.data('ports').length === 2;
      var targetHasPorts = targetNode.data('ports').length === 2;
      // The portsource and porttarget variables
      var portsource;
      var porttarget;

      /*
       * Get input/output port id's of a node with the assumption that the node has valid ports.
       */
      var getIOPortIds = function (node) {
        var nodeInputPortId, nodeOutputPortId;
        var nodePortsOrdering = sbgnvizInstance.elementUtilities.getPortsOrdering(node);
        var nodePorts = node.data('ports');
        if ( nodePortsOrdering === 'L-to-R' || nodePortsOrdering === 'R-to-L' ) {
          var leftPortId = nodePorts[0].x < 0 ? nodePorts[0].id : nodePorts[1].id; // The x value of left port is supposed to be negative
          var rightPortId = nodePorts[0].x > 0 ? nodePorts[0].id : nodePorts[1].id; // The x value of right port is supposed to be positive
          /*
           * If the port ordering is left to right then the input port is the left port and the output port is the right port.
           * Else if it is right to left it is vice versa
           */
          nodeInputPortId = nodePortsOrdering === 'L-to-R' ? leftPortId : rightPortId;
          nodeOutputPortId = nodePortsOrdering === 'R-to-L' ? leftPortId : rightPortId;
        }
        else if ( nodePortsOrdering === 'T-to-B' || nodePortsOrdering === 'B-to-T' ){
          var topPortId = nodePorts[0].y < 0 ? nodePorts[0].id : nodePorts[1].id; // The y value of top port is supposed to be negative
          var bottomPortId = nodePorts[0].y > 0 ? nodePorts[0].id : nodePorts[1].id; // The y value of bottom port is supposed to be positive
          /*
           * If the port ordering is top to bottom then the input port is the top port and the output port is the bottom port.
           * Else if it is right to left it is vice versa
           */
          nodeInputPortId = nodePortsOrdering === 'T-to-B' ? topPortId : bottomPortId;
          nodeOutputPortId = nodePortsOrdering === 'B-to-T' ? topPortId : bottomPortId;
        }

        // Return an object containing the IO ports of the node
        return {
          inputPortId: nodeInputPortId,
          outputPortId: nodeOutputPortId
        };
      };

      // If at least one end of the edge has ports then we should determine the ports where the edge should be connected.
      if (sourceHasPorts || targetHasPorts) {
        var sourceNodeInputPortId, sourceNodeOutputPortId, targetNodeInputPortId, targetNodeOutputPortId;

        // If source node has ports set the variables dedicated for its IO ports
        if ( sourceHasPorts ) {
          var ioPorts = getIOPortIds(sourceNode);
          sourceNodeInputPortId = ioPorts.inputPortId;
          sourceNodeOutputPortId = ioPorts.outputPortId;
        }

        // If target node has ports set the variables dedicated for its IO ports
        if ( targetHasPorts ) {
          var ioPorts = getIOPortIds(targetNode);
          targetNodeInputPortId = ioPorts.inputPortId;
          targetNodeOutputPortId = ioPorts.outputPortId;
        }

        if (sbgnclass === 'consumption') {
          // A consumption edge should be connected to the input port of the target node which is supposed to be a process (any kind of)
          portsource = sourceNodeOutputPortId;
          porttarget = targetNodeInputPortId;
        }
        else if (sbgnclass === 'production') {
          // A production edge should be connected to the output port of the source node which is supposed to be a process (any kind of)
          // A modulation edge may have a logical operator as source node in this case the edge should be connected to the output port of it
          // The below assignment satisfy all of these condition
          if(groupID == 0 || groupID == undefined) { // groupID 0 for reversible reactions group 0
            portsource = sourceNodeOutputPortId;
            porttarget = targetNodeInputPortId;
          }
          else { //if reaction is reversible and edge belongs to group 1
            portsource = sourceNodeInputPortId;
          }
        }
        else if(elementUtilities.isModulationArcClass(sbgnclass) || elementUtilities.isAFArcClass(sbgnclass)){
          portsource = sourceNodeOutputPortId;
        }
        else if (sbgnclass === 'logic arc') {
          var srcClass = sourceNode.data('class');
          var tgtClass = targetNode.data('class');
          var isSourceLogicalOp = srcClass === 'and' || srcClass === 'or' || srcClass === 'not';
          var isTargetLogicalOp = tgtClass === 'and' || tgtClass === 'or' || tgtClass === 'not';

          if (isSourceLogicalOp && isTargetLogicalOp) {
            // If both end are logical operators then the edge should be connected to the input port of the target and the output port of the input
            porttarget = targetNodeInputPortId;
            portsource = sourceNodeOutputPortId;
          }// If just one end of logical operator then the edge should be connected to the input port of the logical operator
          else if (isSourceLogicalOp) {
            portsource = sourceNodeInputPortId;
            porttarget = targetNodeOutputPortId;
          }
          else if (isTargetLogicalOp) {
            portsource = sourceNodeOutputPortId;
            porttarget = targetNodeInputPortId;
          }
        }
      }

      // The default portsource/porttarget are the source/target themselves. If they are not set use these defaults.
      // The portsource and porttarget are determined set them in data object.
      data.portsource = portsource || source;
      data.porttarget = porttarget || target;

      var eles = cy.add({
        group: "edges",
        data: data,
        css: css
      });

      var newEdge = eles[eles.length - 1];

      return newEdge;
    };

    elementUtilities.addProcessWithConvenientEdges = function(_source, _target, nodeParams) {
      // If source and target IDs are given get the elements by IDs
      var source = typeof _source === 'string' ? cy.getElementById(_source) : _source;
      var target = typeof _target === 'string' ? cy.getElementById(_target) : _target;

      // Process parent should be the closest common ancestor of the source and target nodes
      var processParent = cy.collection([source[0], target[0]]).commonAncestors().first();

      // Process should be at the middle of the source and target nodes
      var x = ( source.position('x') + target.position('x') ) / 2;
      var y = ( source.position('y') + target.position('y') ) / 2;

      // Create the process with given/calculated variables
      var process = elementUtilities.addNode(x, y, nodeParams, undefined, processParent.id());
        var xdiff = source.position('x') - target.position('x');
        var ydiff = source.position('y') - target.position('y')
        if (Math.abs(xdiff) >= Math.abs(ydiff))
        {
            if (xdiff < 0)
                elementUtilities.setPortsOrdering(process, 'L-to-R');
            else
                elementUtilities.setPortsOrdering(process, 'R-to-L');
        }
        else
        {
            if (ydiff < 0)
                elementUtilities.setPortsOrdering(process, 'T-to-B');
            else
                elementUtilities.setPortsOrdering(process, 'B-to-T');
        }


      // Create the edges one is between the process and the source node (which should be a consumption),
      // the other one is between the process and the target node (which should be a production).
      // For more information please refer to SBGN-PD reference card.
      var edgeBtwSrc = elementUtilities.addEdge(source.id(), process.id(), {class : 'consumption', language : nodeParams.language});
      var edgeBtwTgt = elementUtilities.addEdge(process.id(), target.id(), {class : 'production', language : nodeParams.language});

      // Create a collection including the elements and to be returned
      var collection = cy.collection([process[0], edgeBtwSrc[0], edgeBtwTgt[0]]);
      return collection;
    };

    /*
     * Returns if the elements with the given parent class can be parent of the elements with the given node class
     */
    elementUtilities.isValidParent = function(_nodeClass, _parentClass, node) {
      // If nodeClass and parentClass params are elements itselves instead of their class names handle it
      var nodeClass = typeof _nodeClass !== 'string' ? _nodeClass.data('class') : _nodeClass;
      var parentClass = _parentClass != undefined && typeof _parentClass !== 'string' ? _parentClass.data('class') : _parentClass;

      if (parentClass == undefined || parentClass === 'compartment'
              || parentClass === 'submap') { // Compartments, submaps and the root can include any type of nodes
        return true;
      }
      else if (parentClass.startsWith('complex') && (!node || node.connectedEdges().length == 0  // Complexes can only include EPNs which do not have edges
              || elementUtilities.mapType == "Unknown")) { // When map type is unknown, allow complexes to include EPNs with edges
        return elementUtilities.isEPNClass(nodeClass);
      }

      return false; // Currently just 'compartment' and 'complex' compounds are supported return false for any other parentClass
    };

    /*
     * This method assumes that param.nodesToMakeCompound contains at least one node
     * and all of the nodes including in it have the same parent. It creates a compound fot the given nodes an having the given type.
     */
    elementUtilities.createCompoundForGivenNodes = function (nodesToMakeCompound, compoundType) {
      var oldParentId = nodesToMakeCompound[0].data("parent");
      var language = nodesToMakeCompound[0].data("language");
      // if nodesToMakeCompound contain both PD and AF nodes, then set language of compound as Unknown
      for( var i=1; i<nodesToMakeCompound.length; i++){
        if(nodesToMakeCompound[i] != language){
          language = "Unknown";
          break;
        }
      }
      // The parent of new compound will be the old parent of the nodes to make compound. x, y and id parameters are not set.
      var newCompound = elementUtilities.addNode(undefined, undefined, {class : compoundType, language : language}, undefined, oldParentId);
      var newCompoundId = newCompound.id();
      var newEles = elementUtilities.changeParent(nodesToMakeCompound, newCompoundId);
      newEles = newEles.union(newCompound);
      return newEles;
    };

    /*
     * Creates a template reaction with given parameters. Requires cose-bilkent layout to tile the free macromolecules included
     * in the complex. Parameters are explained below.
     * templateType: The type of the template reaction. It may be 'association' or 'dissociation' for now.
     * nodeList: The list of the names and types of molecules which will involve in the reaction.
     * complexName: The name of the complex in the reaction.
     * processPosition: The modal position of the process in the reaction. The default value is the center of the canvas.
     * tilingPaddingVertical: This option will be passed to the cose-bilkent layout with the same name. The default value is 15.
     * tilingPaddingHorizontal: This option will be passed to the cose-bilkent layout with the same name. The default value is 15.
     * edgeLength: The distance between the process and the macromolecules at the both sides.
     */
    elementUtilities.createTemplateReaction = function (templateType, nodeList, complexName, processPosition, tilingPaddingVertical, tilingPaddingHorizontal, edgeLength) {

      var defaultMacromoleculProperties = elementUtilities.defaultProperties["macromolecule"];
      var defaultSimpleChemicalProperties = elementUtilities.defaultProperties["simple chemical"];
      var templateType = templateType;
      var processWidth = elementUtilities.defaultProperties[templateType] ? elementUtilities.defaultProperties[templateType].width : 50;
      var macromoleculeWidth = defaultMacromoleculProperties ? defaultMacromoleculProperties.width : 50;
      var macromoleculeHeight = defaultMacromoleculProperties ? defaultMacromoleculProperties.height : 50;
      var simpleChemicalWidth = defaultSimpleChemicalProperties ? defaultSimpleChemicalProperties.width : 35;
      var simpleChemicalHeight = defaultSimpleChemicalProperties ? defaultSimpleChemicalProperties.height : 35;
      var processPosition = processPosition ? processPosition : elementUtilities.convertToModelPosition({x: cy.width() / 2, y: cy.height() / 2});
      var nodeList = nodeList;
      var complexName = complexName;
      var numOfMolecules = nodeList.length;
      var tilingPaddingVertical = tilingPaddingVertical ? tilingPaddingVertical : 15;
      var tilingPaddingHorizontal = tilingPaddingHorizontal ? tilingPaddingHorizontal : 15;
      var edgeLength = edgeLength ? edgeLength : 60;

      cy.startBatch();

      var xPositionOfFreeMacromolecules;
      var xPositionOfInputMacromolecules;

      if (templateType === 'association') {
        xPositionOfFreeMacromolecules = processPosition.x - edgeLength - processWidth / 2 - macromoleculeWidth / 2;
        if (!elementUtilities.getMapType()) {
          elementUtilities.setMapType("PD");
        }
      }
      else if(templateType === 'dissociation'){
        xPositionOfFreeMacromolecules = processPosition.x + edgeLength + processWidth / 2 + macromoleculeWidth / 2;
        if (!elementUtilities.getMapType()) {
          elementUtilities.setMapType("PD");
        }
      }
      else{
        elementUtilities.setMapType("Unknown");
        xPositionOfFreeMacromolecules = processPosition.x - edgeLength - processWidth / 2 - macromoleculeWidth / 2;
        xPositionOfInputMacromolecules = processPosition.x + edgeLength + processWidth / 2 + macromoleculeWidth / 2;
      }

      //Create the process in template type
      var process;
      if (templateType === 'reversible') {
        process = elementUtilities.addNode(processPosition.x, processPosition.y, {class : 'process', language : 'PD'});
        elementUtilities.setPortsOrdering(process, 'L-to-R');
      }
      else{
        process = elementUtilities.addNode(processPosition.x, processPosition.y, {class : templateType, language : 'PD'});
        elementUtilities.setPortsOrdering(process, 'L-to-R');
      }
      process.data('justAdded', true);

      //Define the starting y position
      var yPosition = processPosition.y - ((numOfMolecules - 1) / 2) * (macromoleculeHeight + tilingPaddingVertical);

      //Create the free molecules
      for (var i = 0; i < numOfMolecules; i++) {
        // node addition operation is determined by molecule type
        if(nodeList[i].type == "Simple Chemical"){
          var newNode = elementUtilities.addNode(xPositionOfFreeMacromolecules, yPosition, {class : 'simple chemical', language : 'PD'});
          //update the y position
          yPosition += simpleChemicalHeight + tilingPaddingVertical;
        }
        else{
          var newNode = elementUtilities.addNode(xPositionOfFreeMacromolecules, yPosition, {class : 'macromolecule', language : 'PD'});
          //update the y position
          yPosition += macromoleculeHeight + tilingPaddingVertical;
        }
        newNode.data('justAdded', true);
        newNode.data('label', nodeList[i].name);

        //create the edge connected to the new molecule
        var newEdge;
        if (templateType === 'association') {
          newEdge = elementUtilities.addEdge(newNode.id(), process.id(), {class : 'consumption', language : 'PD'});
        }
        else if(templateType === 'dissociation'){
          newEdge = elementUtilities.addEdge(process.id(), newNode.id(), {class : 'production', language : 'PD'});
        }
        else{
          //Group right or top elements in group id 1
          newEdge = elementUtilities.addEdge(process.id(), newNode.id(), {class : 'production', language : 'PD'}, undefined, undefined, 1);
        }

        newEdge.data('justAdded', true);
      }

      if(templateType === 'association' || templateType == 'dissociation'){
        //Create the complex including macromolecules inside of it
        //Temprorarily add it to the process position we will move it according to the last size of it
        var complex = elementUtilities.addNode(processPosition.x, processPosition.y, {class : 'complex', language : 'PD'});
        complex.data('justAdded', true);
        complex.data('justAddedLayoutNode', true);

        //If a name is specified for the complex set its label accordingly
        if (complexName) {
          complex.data('label', complexName);
        }

        //create the edge connnected to the complex
        var edgeOfComplex;

        if (templateType === 'association') {
          edgeOfComplex = elementUtilities.addEdge(process.id(), complex.id(), {class : 'production', language : 'PD'});
        }
        else {
          edgeOfComplex = elementUtilities.addEdge(complex.id(), process.id(), {class : 'consumption', language : 'PD'});
        }

        edgeOfComplex.data('justAdded', true);

        for (var i = 0; i < numOfMolecules; i++) {

          // Add a molecule(dependent on it's type) not having a previously defined id and having the complex created in this reaction as parent
          if(nodeList[i].type == 'Simple Chemical'){
            var newNode = elementUtilities.addNode(complex.position('x'), complex.position('y'), {class : 'simple chemical', language : 'PD'}, undefined, complex.id());
          }
          else{
            var newNode = elementUtilities.addNode(complex.position('x'), complex.position('y'), {class : 'macromolecule', language : 'PD'}, undefined, complex.id());
          }

          newNode.data('justAdded', true);
          newNode.data('label', nodeList[i].name);
          newNode.data('justAddedLayoutNode', true);
        }
      }
      else{

        //Create the input macromolecules
        var numOfInputMacromolecules = complexName.length;
        yPosition = processPosition.y - ((numOfInputMacromolecules - 1) / 2) * (macromoleculeHeight + tilingPaddingVertical);

        for (var i = 0; i < numOfInputMacromolecules; i++) {

          if(complexName[i].type == 'Simple Chemical'){
            var newNode = elementUtilities.addNode(xPositionOfInputMacromolecules, yPosition, {class : 'simple chemical', language : 'PD'});
            yPosition += simpleChemicalHeight + tilingPaddingVertical;
          }
          else{
            var newNode = elementUtilities.addNode(xPositionOfInputMacromolecules, yPosition, {class : 'macromolecule', language : 'PD'});
            yPosition += macromoleculeHeight + tilingPaddingVertical;
          }

          newNode.data('justAdded', true);
          newNode.data('label', complexName[i].name);

          //create the edge connected to the new macromolecule
          var newEdge;

          //Group the left or bottom elements in group id 0
          newEdge = elementUtilities.addEdge(process.id(), newNode.id(), {class : 'production', language : 'PD'}, undefined, undefined, 0);
          newEdge.data('justAdded', true);

        }
      }

      cy.endBatch();

      var layoutNodes = cy.nodes('[justAddedLayoutNode]');
      layoutNodes.removeData('justAddedLayoutNode');
      var layout = layoutNodes.layout({
        name: 'cose-bilkent',
        randomize: false,
        fit: false,
        animate: false,
        tilingPaddingVertical: tilingPaddingVertical,
        tilingPaddingHorizontal: tilingPaddingHorizontal,
        stop: function () {
          //If it is a reversible reaction no need to re-position complexes
          if(templateType === 'reversible')
            return;
          //re-position the nodes inside the complex
          var supposedXPosition;
          var supposedYPosition = processPosition.y;

          if (templateType === 'association') {
            supposedXPosition = processPosition.x + edgeLength + processWidth / 2 + complex.outerWidth() / 2;
          }
          else {
            supposedXPosition = processPosition.x - edgeLength - processWidth / 2 - complex.outerWidth() / 2;
          }

          var positionDiffX = supposedXPosition - complex.position('x');
          var positionDiffY = supposedYPosition - complex.position('y');
          elementUtilities.moveNodes({x: positionDiffX, y: positionDiffY}, complex);
        }
      });

      // Do this check for cytoscape.js backward compatibility
      if (layout && layout.run && templateType !== 'reversible') {
        layout.run();
      }

      //filter the just added elememts to return them and remove just added mark
      var eles = cy.elements('[justAdded]');
      eles.removeData('justAdded');

      cy.elements().unselect();
      eles.select();

      return eles; // Return the just added elements
    };

    /*
     * Move the nodes to a new parent and change their position if possDiff params are set.
     */
    elementUtilities.changeParent = function(nodes, newParent, posDiffX, posDiffY) {
      var newParentId = newParent == undefined || typeof newParent === 'string' ? newParent : newParent.id();
      var movedEles = nodes.move({"parent": newParentId});
      if(typeof posDiffX != 'undefined' || typeof posDiffY != 'undefined') {
        elementUtilities.moveNodes({x: posDiffX, y: posDiffY}, nodes);
      }
      elementUtilities.maintainPointer(movedEles);
      return movedEles;
    };

    // Resize given nodes if useAspectRatio is truthy one of width or height should not be set.
    elementUtilities.resizeNodes = function (nodes, width, height, useAspectRatio, preserveRelativePos) {
      for (var i = 0; i < nodes.length; i++) {

        var node = nodes[i];
        var ratio = undefined;
        var eleMustBeSquare = elementUtilities.mustBeSquare(node.data('class'));

        if (preserveRelativePos === true) {
          var oldWidth = node.data("bbox").w;
          var oldHeight = node.data("bbox").h;
        }

        // Note that both width and height should not be set if useAspectRatio is truthy
        if (width) {
          if (useAspectRatio || eleMustBeSquare) {
            ratio = width / node.width();
          }

          node.data("bbox").w = width;
        }

        if (height) {
          if (useAspectRatio || eleMustBeSquare) {
            ratio = height / node.height();
          }

          node.data("bbox").h = height;
        }

        if (ratio && !height) {
          node.data("bbox").h = node.height() * ratio;
        }
        else if (ratio && !width) {
          node.data("bbox").w = node.width() * ratio;
        }

        if (preserveRelativePos === true) {
          var statesandinfos = node.data('statesandinfos');
          var topBottom = statesandinfos.filter(box => (box.anchorSide === "top" || box.anchorSide === "bottom"));
          var rightLeft = statesandinfos.filter(box => (box.anchorSide === "right" || box.anchorSide === "left"));

          topBottom.forEach(function(box){
            if (box.bbox.x < 0) {
              box.bbox.x = 0;
            }
            else if (box.bbox.x > oldWidth) {
              box.bbox.x = oldWidth;
            }
            box.bbox.x = node.data("bbox").w * box.bbox.x / oldWidth;
          });

          rightLeft.forEach(function(box){
            if (box.bbox.y < 0) {
              box.bbox.y = 0;
            }
            else if (box.bbox.y > oldHeight) {
              box.bbox.y = oldHeight;
            }
            box.bbox.y = node.data("bbox").h * box.bbox.y / oldHeight;
          });
        }
      }
    };



    elementUtilities.calculateMinWidth = function(node) {

        var defaultWidth = ((this.defaultProperties)[node.data('class')]).width;

        // Label width calculation
        var context = document.createElement('canvas').getContext("2d");
        var style = node.style();
        context.font = style['font-size'] + " " + style['font-family'];

        var labelText = (style['label']).split("\n");

        var maxLabel = 0;
        labelText.forEach(function(text){
          var textWidth = context.measureText(text).width;
          if (maxLabel < textWidth) {
            maxLabel = textWidth;
          }
        });

        var statesandinfos = node.data('statesandinfos');
        //Top and bottom infoBoxes
        var topInfoBoxes = statesandinfos.filter(box => box.anchorSide === "top");
        var bottomInfoBoxes = statesandinfos.filter(box => box.anchorSide === "bottom");
        var unitGap = 5;
        var topWidth = unitGap;
        var rightOverFlow = 0;
        var leftOverFlow = 0;
        topInfoBoxes.forEach(function(box){
          topWidth += box.bbox.w + unitGap;
          if (box.bbox.x + box.bbox.w/2 > node.data('bbox').w) {
            var overFlow = node.data('bbox').w - (box.bbox.x + box.bbox.w/2);
            if (overFlow > rightOverFlow) {
              rightOverFlow = overFlow;
            }
          }
          if (box.bbox.x - box.bbox.w/2 < 0) {
            var overFlow = -(box.bbox.x - box.bbox.w/2);
            if (overFlow > leftOverFlow) {
              leftOverFlow = overFlow;
            }
          }
        });
        if (rightOverFlow > 0) {
          topWidth -= rightOverFlow + unitGap;
        }

        if (leftOverFlow > 0) {
          topWidth -= leftOverFlow + unitGap;
        }

        var bottomWidth = unitGap;
        rightOverFlow = 0;
        leftOverFlow = 0;
        bottomInfoBoxes.forEach(function(box){
          bottomWidth += box.bbox.w + unitGap;
          if (box.bbox.x + box.bbox.w/2 > node.data('bbox').w) {
            var overFlow = node.data('bbox').w - (box.bbox.x + box.bbox.w/2);
            if (overFlow > rightOverFlow) {
              rightOverFlow = overFlow;
            }
          }
          if (box.bbox.x - box.bbox.w/2 < 0) {
            var overFlow = -(box.bbox.x - box.bbox.w/2);
            if (overFlow > leftOverFlow) {
              leftOverFlow = overFlow;
            }
          }
        });
        if (rightOverFlow > 0) {
          bottomWidth -= rightOverFlow + unitGap;
        }

        if (leftOverFlow > 0) {
          bottomWidth -= leftOverFlow + unitGap;
        }

        // Separation of info boxes based on their locations
        var leftInfoBoxes = statesandinfos.filter(box => box.anchorSide === "left");
        var rightInfoBoxes = statesandinfos.filter(box => box.anchorSide === "right");

        var middleWidth = 0;
        var leftWidth = 0;
        var rightWidth = 0;

        leftInfoBoxes.forEach(function (infoBox) {
          if (infoBox.bbox.y !== 0 && infoBox.bbox.y !== node.data('bbox').h) {
            leftWidth = (leftWidth > infoBox.bbox.w/2) ? leftWidth : infoBox.bbox.w/2;
          }
        });

        rightInfoBoxes.forEach(function (infoBox) {
          if (infoBox.bbox.y !== 0 && infoBox.bbox.y !== node.data('bbox').h) {
            rightWidth = (rightWidth > infoBox.bbox.w/2) ? rightWidth : infoBox.bbox.w/2;
          }
        });

        var margin = 5;
        var middleWidth = maxLabel + 2 * Math.max(leftWidth, rightWidth) + 2 * margin;
        return Math.max(middleWidth, defaultWidth/2, topWidth, bottomWidth);
    }

    elementUtilities.calculateMinHeight = function(node) {
        var statesandinfos = node.data('statesandinfos');
        var margin = 7;
        var unitGap = 5;
        var defaultHeight = ((this.defaultProperties)[node.data('class')]).height;
        var leftInfoBoxes = statesandinfos.filter(box => box.anchorSide === "left");
        var leftHeight = unitGap;
        var topOverFlow = 0;
        var bottomOverFlow = 0;
        leftInfoBoxes.forEach(function(box){
            leftHeight += box.bbox.h + unitGap;
            if (box.bbox.y + box.bbox.h/2 > node.data('bbox').h) {
              var overFlow = node.data('bbox').h - (box.bbox.y + box.bbox.h/2);
              if (overFlow > bottomOverFlow) {
                bottomOverFlow = overFlow;
              }
            }
            if (box.bbox.y - box.bbox.h/2 < 0) {
              var overFlow = -(box.bbox.y - box.bbox.h/2);
              if (overFlow > topOverFlow) {
                topOverFlow = overFlow;
              }
            }
        });
        if (topOverFlow > 0) {
          leftHeight -= topOverFlow + unitGap;
        }

        if (bottomOverFlow > 0) {
          leftHeight -= bottomOverFlow + unitGap;
        }

        var rightInfoBoxes = statesandinfos.filter(box => box.anchorSide === "right");
        var rightHeight = unitGap;
        topOverFlow = 0;
        bottomOverFlow = 0;
        rightInfoBoxes.forEach(function(box){
            rightHeight += box.bbox.h + unitGap;
            if (box.bbox.y + box.bbox.h/2 > node.data('bbox').h) {
              var overFlow = node.data('bbox').h - (box.bbox.y + box.bbox.h/2);
              if (overFlow > bottomOverFlow) {
                bottomOverFlow = overFlow;
              }
            }
            if (box.bbox.y - box.bbox.h/2 < 0) {
              var overFlow = -(box.bbox.y - box.bbox.h/2);
              if (overFlow > topOverFlow) {
                topOverFlow = overFlow;
              }
            }
        });
        if (topOverFlow > 0) {
          rightHeight -= topOverFlow + unitGap;
        }

        if (bottomOverFlow > 0) {
          rightHeight -= bottomOverFlow + unitGap;
        }

        var style = node.style();
        var labelText = ((style['label']).split("\n")).filter( text => text !== '');
        var fontSize = parseFloat(style['font-size'].substring(0, style['font-size'].length - 2));
        var totalHeight = labelText.length * fontSize + 2 * margin;

        return Math.max(totalHeight, defaultHeight/2, leftHeight, rightHeight);
    }

    // Section End
    // Add remove utilities

    // Section Start
    // Common element properties

    // Get common properties of given elements. Returns null if the given element list is empty or the
    // property is not common for all elements. dataOrCss parameter specify whether to check the property on data or css.
    // The default value for it is data. If propertyName parameter is given as a function instead of a string representing the
    // property name then use what that function returns.
    elementUtilities.getCommonProperty = function (elements, propertyName, dataOrCss) {
      if (elements.length == 0) {
        return null;
      }

      var isFunction;
      // If we are not comparing the properties directly users can specify a function as well
      if (typeof propertyName === 'function') {
        isFunction = true;
      }

      // Use data as default
      if (!isFunction && !dataOrCss) {
        dataOrCss = 'data';
      }

      var value = isFunction ? propertyName(elements[0]) : elements[0][dataOrCss](propertyName);

      for (var i = 1; i < elements.length; i++) {
        if ( ( isFunction ? propertyName(elements[i]) : elements[i][dataOrCss](propertyName) ) != value) {
          return null;
        }
      }

      return value;
    };

    // Returns if the function returns a truthy value for all of the given elements.
    elementUtilities.trueForAllElements = function (elements, fcn) {
      for (var i = 0; i < elements.length; i++) {
        if (!fcn(elements[i])) {
          return false;
        }
      }

      return true;
    };

    // Returns whether the give element can have sbgncardinality
    elementUtilities.canHaveSBGNCardinality = function (ele) {
      var sbgnclass = typeof ele === 'string' ? ele : ele.data('class');

      return sbgnclass == 'consumption' || sbgnclass == 'production';
    };

    // Returns whether the give element can have sbgnlabel
    elementUtilities.canHaveSBGNLabel = function (ele) {
      var sbgnclass = typeof ele === 'string' ? ele : ele.data('class');

      return sbgnclass != 'and' && sbgnclass != 'or' && sbgnclass != 'not' && sbgnclass != 'delay'
              && sbgnclass != 'association' && sbgnclass != 'dissociation' && sbgnclass != 'source and sink' && !sbgnclass.endsWith('process');
    };

    // Returns whether the give element have unit of information
    elementUtilities.canHaveUnitOfInformation = function (ele) {
      var sbgnclass = typeof ele === 'string' ? ele : ele.data('class');

      if (sbgnclass == 'simple chemical'
              || sbgnclass == 'macromolecule' || sbgnclass == 'nucleic acid feature'
              || sbgnclass == 'complex' || sbgnclass == 'simple chemical multimer'
              || sbgnclass == 'macromolecule multimer' || sbgnclass == 'nucleic acid feature multimer'
              || sbgnclass == 'complex multimer' || (sbgnclass.startsWith('BA') && sbgnclass != "BA plain")
              || sbgnclass == 'compartment') {
        return true;
      }
      return false;
    };

    // Returns whether the given element can have more than one units of information
    elementUtilities.canHaveMultipleUnitOfInformation = function (ele) {
      var sbgnclass = typeof ele === 'string' ? ele : ele.data('class');
      return !sbgnclass.startsWith('BA');
    };


    // Returns whether the give element have state variable
    elementUtilities.canHaveStateVariable = function (ele) {
      var sbgnclass = typeof ele === 'string' ? ele : ele.data('class');

      if (sbgnclass == 'macromolecule' || sbgnclass == 'nucleic acid feature'
              || sbgnclass == 'complex'
              || sbgnclass == 'macromolecule multimer' || sbgnclass == 'nucleic acid feature multimer'
              || sbgnclass == 'complex multimer') {
        return true;
      }
      return false;
    };

    // Returns whether the given ele should be square in shape
    elementUtilities.mustBeSquare = function (ele) {
      var sbgnclass = typeof ele === 'string' ? ele : ele.data('class');

      return (sbgnclass.indexOf('process') != -1 || sbgnclass == 'source and sink'
              || sbgnclass == 'and' || sbgnclass == 'or' || sbgnclass == 'not'
              || sbgnclass == 'association' || sbgnclass == 'dissociation' || sbgnclass == 'delay');
    };

    // Returns whether any of the given nodes must not be in square shape
    elementUtilities.someMustNotBeSquare = function (nodes) {
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (!elementUtilities.mustBeSquare(node.data('class'))) {
          return true;
        }
      }

      return false;
    };

    // Returns whether the gives element can be cloned
    elementUtilities.canBeCloned = function (ele) {
      var sbgnclass = (typeof ele === 'string' ? ele : ele.data('class')).replace(" multimer", "");

      var list = {
        'unspecified entity': true,
        'macromolecule': true,
        'complex': true,
        'nucleic acid feature': true,
        'simple chemical': true,
        'perturbing agent': true
      };

      return list[sbgnclass] ? true : false;
    };

    // Returns whether the gives element can be cloned
    elementUtilities.canBeMultimer = function (ele) {
      var sbgnclass = (typeof ele === 'string' ? ele : ele.data('class')).replace(" multimer", "");

      var list = {
        'macromolecule': true,
        'complex': true,
        'nucleic acid feature': true,
        'simple chemical': true
      };

      return list[sbgnclass] ? true : false;
    };

    // Returns whether the given element is an EPN
    elementUtilities.isEPNClass = function (ele) {
      var sbgnclass = (typeof ele === 'string' ? ele : ele.data('class')).replace(" multimer", "");

      return (sbgnclass == 'unspecified entity'
              || sbgnclass == 'simple chemical'
              || sbgnclass == 'macromolecule'
              || sbgnclass == 'nucleic acid feature'
              || sbgnclass == 'complex');
    };

    // Returns whether the given element is a PN
    elementUtilities.isPNClass = function (ele) {
      var sbgnclass = (typeof ele === 'string' ? ele : ele.data('class')).replace(" multimer", "");

      return (sbgnclass == 'process'
              || sbgnclass == 'omitted process'
              || sbgnclass == 'uncertain process'
              || sbgnclass == 'association'
              || sbgnclass == 'dissociation'
              || sbgnclass == 'phenotype');
    };

    // Returns wether the given element or string is of the special empty set/source and sink class
    elementUtilities.isEmptySetClass = function (ele) {
      var sbgnclass = (typeof ele === 'string' ? ele : ele.data('class')).replace(" multimer", "");
      return sbgnclass == 'source and sink';
    };

    // Returns whether the given element is a logical operator
    elementUtilities.isLogicalOperator = function (ele) {
      var sbgnclass = typeof ele === 'string' ? ele : ele.data('class');
      return (sbgnclass == 'and' || sbgnclass == 'or' || sbgnclass == 'not' || sbgnclass == 'delay');
    };

    // Returns whether the class of given element is a equivalance class
    elementUtilities.convenientToEquivalence = function (ele) {
      var sbgnclass = typeof ele === 'string' ? ele : ele.data('class');
      return (sbgnclass == 'tag' || sbgnclass == 'terminal');
    };

    // Returns whether the class of given element is a modulation arc as defined in PD specs
    elementUtilities.isModulationArcClass = function (ele) {
      var sbgnclass = typeof ele === 'string' ? ele : ele.data('class');
      return (sbgnclass == 'modulation'
              || sbgnclass == 'stimulation' || sbgnclass == 'catalysis'
              || sbgnclass == 'inhibition' || sbgnclass == 'necessary stimulation');
    };
    
    // Returns whether the class of given element is an arc of AF specs except logical arc
    elementUtilities.isAFArcClass = function (ele) {
      var sbgnclass = typeof ele === 'string' ? ele : ele.data('class');
      return (sbgnclass == 'positive influence' || sbgnclass == 'negative influence' 
              || sbgnclass == 'unknown influence' || sbgnclass == 'necessary stimulation');
    };

    // Relocates state and info boxes. This function is expected to be called after add/remove state and info boxes
    elementUtilities.relocateStateAndInfos = function (ele) {
      var stateAndInfos = (ele.isNode && ele.isNode()) ? ele.data('statesandinfos') : ele;
      var length = stateAndInfos.length;
      if (length == 0) {
        return;
      }
      else if (length == 1) {
        stateAndInfos[0].bbox.x = 0;
        stateAndInfos[0].bbox.y = -50;
      }
      else if (length == 2) {
        stateAndInfos[0].bbox.x = 0;
        stateAndInfos[0].bbox.y = -50;

        stateAndInfos[1].bbox.x = 0;
        stateAndInfos[1].bbox.y = 50;
      }
      else if (length == 3) {
        stateAndInfos[0].bbox.x = -25;
        stateAndInfos[0].bbox.y = -50;

        stateAndInfos[1].bbox.x = 25;
        stateAndInfos[1].bbox.y = -50;

        stateAndInfos[2].bbox.x = 0;
        stateAndInfos[2].bbox.y = 50;
      }
      else {
        stateAndInfos[0].bbox.x = -25;
        stateAndInfos[0].bbox.y = -50;

        stateAndInfos[1].bbox.x = 25;
        stateAndInfos[1].bbox.y = -50;

        stateAndInfos[2].bbox.x = -25;
        stateAndInfos[2].bbox.y = 50;

        stateAndInfos[3].bbox.x = 25;
        stateAndInfos[3].bbox.y = 50;
      }
    };

    // Change state value or unit of information box of given nodes with given index.
    // Type parameter indicates whether to change value or variable, it is valid if the box at the given index is a state variable.
    // Value parameter is the new value to set.
    // This method returns the old value of the changed data (We assume that the old value of the changed data was the same for all nodes).
    // Each character assumed to occupy 8 unit
    // Each infobox can have at most 32 units of width
    elementUtilities.changeStateOrInfoBox = function (nodes, index, value, type) {
      var result;
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var stateAndInfos = node.data('statesandinfos');
        var box = stateAndInfos[index];
        var oldLength = box.bbox.w;
        var newLength = 0;
        var context = document.createElement('canvas').getContext("2d");
        context.font = "10px sans-serif"; //font of information boxes
        if (box.clazz == "state variable") {
          if (!result) {
            result = box.state[type];
          }

          box.state[type] = value;
          if (box.state["value"] !== undefined) {
            newLength = context.measureText(box.state["value"]).width;
          }
          if (box.state["variable"] !== undefined && box.state["variable"].length > 0) {
            newLength += context.measureText(box.state["variable"]).width + context.measureText("@").width;
          }

        }
        else if (box.clazz == "unit of information") {
          if (!result) {
            result = box.label.text;
          }
          newLength = context.measureText(value).width;
          box.label.text = value;
        }
        if (newLength < 12) {
          box.bbox.w = 12;
        }else if(newLength < 48){
          box.bbox.w = newLength; // Arrange information box size dynamically
        }else{
          box.bbox.w = 48; // Maximum size of a state or information box
        }


        if (box.anchorSide === "top" || box.anchorSide === "bottom") {
          box.bbox.x += (box.bbox.w - oldLength) / 2;
          var units = (node.data('auxunitlayouts')[box.anchorSide]).units;
          var shiftIndex = 0;
          for (var i = 0; i < units.length; i++) {
            if(units[i] === box){
              shiftIndex = i;
              break;
            }
          }
          for (var j = shiftIndex+1; j < units.length; j++) {
              units[j].bbox.x += (box.bbox.w - oldLength);
          }
        }

      }
      
      //TODO find a way to elimate this redundancy to update info-box positions
      node.data('border-width', node.data('border-width'));

      return result;
    };

    // Add a new state or info box to given nodes.
    // The box is represented by the parameter obj.
    // This method returns the index of the just added box.
    elementUtilities.addStateOrInfoBox = function (nodes, obj) {
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];

        var locationObj;
        if(obj.clazz == "unit of information") {
          if (node.data("language") == "AF"){
            locationObj = sbgnvizInstance.classes.UnitOfInformation.create(node, cy, obj.label.text, obj.bbox, obj.location, obj.position, obj.index,
                libs.cytoscape.sbgn.AfShapeFn, libs.cytoscape.sbgn.AfShapeArgsFn);
          }
          else {
            locationObj = sbgnvizInstance.classes.UnitOfInformation.create(node, cy, obj.label.text, obj.bbox, obj.location, obj.position, obj.index);
          }
        }
        else if (obj.clazz == "state variable") {
          locationObj = sbgnvizInstance.classes.StateVariable.create(node, cy, obj.state.value, obj.state.variable, obj.bbox, obj.location, obj.position, obj.index);
        }
      }
      return locationObj;
    };

    // Remove the state or info boxes of the given nodes at given index.
    // Returns the removed box.
    elementUtilities.removeStateOrInfoBox = function (nodes, locationObj) {
      var obj;
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var stateAndInfos = node.data('statesandinfos');
        var unit = stateAndInfos[locationObj.index];

        var unitClass = sbgnvizInstance.classes.getAuxUnitClass(unit);

        obj = unitClass.remove(unit, cy);
      }

      return obj;
    };


    //Tiles informations boxes for given anchorSides
    elementUtilities.fitUnits = function (node, locations) {
      var obj = [];
      node.data('statesandinfos').forEach( function (ele) {
        obj.push({
          x: ele.bbox.x,
          y: ele.bbox.y,
          anchorSide: ele.anchorSide
        });
      });
      sbgnvizInstance.classes.AuxUnitLayout.fitUnits(node, cy, locations);
      return obj;
    };

    //Check which anchorsides fits
    elementUtilities.checkFit = function (node, location) { //if no location given, it checks all possible locations
      return sbgnvizInstance.classes.AuxUnitLayout.checkFit(node, cy, location);
    };

    //Modify array of aux layout units
    elementUtilities.modifyUnits = function (node, unit, anchorSide) {
      sbgnvizInstance.classes.AuxUnitLayout.modifyUnits(node, unit, anchorSide, cy);
    };

    // Set multimer status of the given nodes to the given status.
    elementUtilities.setMultimerStatus = function (nodes, status) {
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var sbgnclass = node.data('class');
        var isMultimer = node.data('class').endsWith(' multimer');

        if (status) { // Make multimer status true
          if (!isMultimer) {
            node.data('class', sbgnclass + ' multimer');
          }
        }
        else { // Make multimer status false
          if (isMultimer) {
            node.data('class', sbgnclass.replace(' multimer', ''));
          }
        }
      }
    };

    // Change font properties of the given elements with given font data
    elementUtilities.changeFontProperties = function (eles, data) {
      for (var prop in data) {
        eles.data(prop, data[prop]);
      }
    };

    // This function gets an edge, and ends of that edge (Optionally it may take just the classes of the edge as well) as parameters.
    // It may return 'valid' (that ends is valid for that edge), 'reverse' (that ends is not valid for that edge but they would be valid
    // if you reverse the source and target), 'invalid' (that ends are totally invalid for that edge).
    elementUtilities.validateArrowEnds = function (edge, source, target) {
      // if map type is Unknown -- no rules applied
      if (elementUtilities.getMapType() == "Unknown" || !elementUtilities.getMapType())
        return "valid";

      var edgeclass = typeof edge === 'string' ? edge : edge.data('class');
      var sourceclass = source.data('class');
      var targetclass = target.data('class');

      if (elementUtilities.getMapType() == "AF"){
        if (sourceclass.startsWith("BA")) // we have separate classes for each biological activity
          sourceclass = "biological activity"; // but same rule applies to all of them

        if (targetclass.startsWith("BA")) // we have separate classes for each biological activity
          targetclass = "biological activity"; // but same rule applies to all of them

        var edgeConstraints = elementUtilities.AF.connectivityConstraints[edgeclass];
      }
      else{
        sourceclass = sourceclass.replace(/\s*multimer$/, '')
        targetclass = targetclass.replace(/\s*multimer$/, '')
        var edgeConstraints = elementUtilities.PD.connectivityConstraints[edgeclass];
      }
      // given a node, acting as source or target, returns boolean wether or not it has too many edges already
      function hasTooManyEdges(node, sourceOrTarget) {
        var nodeclass = node.data('class');
        nodeclass = nodeclass.replace(/\s*multimer$/, '');
        if (nodeclass.startsWith("BA"))
          nodeclass = "biological activity";

        var totalTooMany = true;
        var edgeTooMany = true;
        if (sourceOrTarget == "source") {
            var sameEdgeCountOut = node.outgoers('edge[class="'+edgeclass+'"]').size();
            var totalEdgeCountOut = node.outgoers('edge').size();
            // check that the total edge count is within the limits
            if (typeof edgeConstraints[nodeclass].asSource.maxTotal == 'undefined'
                || totalEdgeCountOut < edgeConstraints[nodeclass].asSource.maxTotal ) {
                totalTooMany = false;
            }
            // then check limits for this specific edge class
            if (typeof edgeConstraints[nodeclass].asSource.maxEdge == 'undefined'
                || sameEdgeCountOut < edgeConstraints[nodeclass].asSource.maxEdge ) {
                edgeTooMany = false;
            }
            // if only one of the limits is reached then edge is invalid
            return totalTooMany || edgeTooMany;
        }
        else { // node is used as target
            var sameEdgeCountIn = node.incomers('edge[class="'+edgeclass+'"]').size();
            var totalEdgeCountIn = node.incomers('edge').size();
            if (typeof edgeConstraints[nodeclass].asTarget.maxTotal == 'undefined'
                || totalEdgeCountIn < edgeConstraints[nodeclass].asTarget.maxTotal ) {
                totalTooMany = false;
            }
            if (typeof edgeConstraints[nodeclass].asTarget.maxEdge == 'undefined'
                || sameEdgeCountIn < edgeConstraints[nodeclass].asTarget.maxEdge ) {
                edgeTooMany = false;
            }
            return totalTooMany || edgeTooMany;
        }
        return false;
      }

      function isInComplex(node) {
        var parentClass = node.parent().data('class');
        return parentClass && parentClass.startsWith('complex');
      }

      if (isInComplex(source) || isInComplex(target)) { // subunits of a complex are no longer EPNs, no connection allowed
        return 'invalid';
      }

      // check nature of connection
      if (edgeConstraints[sourceclass].asSource.isAllowed && edgeConstraints[targetclass].asTarget.isAllowed) {
        // check amount of connections
        if (!hasTooManyEdges(source, "source") && !hasTooManyEdges(target, "target") ) {
          return 'valid';
        }
      }
      // try to reverse
      if (edgeConstraints[targetclass].asSource.isAllowed && edgeConstraints[sourceclass].asTarget.isAllowed) {
        if (!hasTooManyEdges(target, "source") && !hasTooManyEdges(source, "target") ) {
          return 'reverse';
        }
      }
      return 'invalid';
    };

    /*
     * Hide given eles and perform given layout afterward. Layout parameter may be layout options
     * or a function to call.
     */
    elementUtilities.hideAndPerformLayout = function(eles, layoutparam) {
        var result = cy.viewUtilities().hide(eles); // Hide given eles
        if (typeof layoutparam === 'function') {
            layoutparam(); // If layoutparam is a function execute it
        }
        else {
            var layout = cy.layout(layoutparam); // If layoutparam is layout options call layout with that options.

            // Do this check for cytoscape.js backward compatibility
            if (layout && layout.run) {
                layout.run();
            }
        }

        return result;
    };

    /*
     * Unhide given eles and perform given layout afterward. Layout parameter may be layout options
     * or a function to call.
     */
    elementUtilities.showAndPerformLayout = function(eles, layoutparam) {
      var result = cy.viewUtilities().show(eles); // Show given eles
      if (typeof layoutparam === 'function') {
        layoutparam(); // If layoutparam is a function execute it
      }
      else {
        var layout = cy.layout(layoutparam); // If layoutparam is layout options call layout with that options.

        // Do this check for cytoscape.js backward compatibility
        if (layout && layout.run) {
          layout.run();
        }
      }

      return result;
    };

    /*
     * Change style/css of given eles by setting getting property name to the given value/values (Note that valueMap parameter may be
     * a single string or an id to value map).
     */
    elementUtilities.changeCss = function(eles, name, valueMap) {
      if ( typeof valueMap === 'object' ) {
        cy.startBatch();
        for (var i = 0; i < eles.length; i++) {
          var ele = cy.getElementById(eles[i].id());
          ele.css(name, valueMap[ele.id()]); // valueMap is an id to value map use it in this way
        }
        cy.endBatch();
      }
      else {
        eles.css(name, valueMap); // valueMap is just a string set css('name') for all eles to this value
      }
    };

    /*
     * Change data of given eles by setting getting property name to the given value/values (Note that valueMap parameter may be
     * a single string or an id to value map).
     */
    elementUtilities.changeData = function(eles, name, valueMap) {
      if ( typeof valueMap === 'object' ) {
        cy.startBatch();
        for (var i = 0; i < eles.length; i++) {
          var ele = cy.getElementById(eles[i].id());
          ele.data(name, valueMap[ele.id()]); // valueMap is an id to value map use it in this way
        }
        cy.endBatch();
      }
      else {
        eles.data(name, valueMap); // valueMap is just a string set css('name') for all eles to this value
      }
    };

    /*
     * Return the set of all nodes present under the given position
     * renderedPos must be a point defined relatively to cytoscape container
     * (like renderedPosition field of a node)
     */
    elementUtilities.getNodesAt = function(renderedPos) {
      var nodes = cy.nodes();
      var x = renderedPos.x;
      var y = renderedPos.y;
      var resultNodes = [];
      for(var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var renderedBbox = node.renderedBoundingBox({
          includeNodes: true,
          includeEdges: false,
          includeLabels: false,
          includeShadows: false
        });
        if (x >= renderedBbox.x1 && x <= renderedBbox.x2) {
          if (y >= renderedBbox.y1 && y <= renderedBbox.y2) {
            resultNodes.push(node);
          }
        }
      }
      return resultNodes;
    };

    elementUtilities.demultimerizeClass = function(sbgnclass) {
      return sbgnclass.replace(" multimer", "");
    };

    /**
     * @param mapType - type of the current map (PD, AF or Unknown)
     */
    elementUtilities.setMapType = function(mapType){
      elementUtilities.mapType = mapType;
      return mapType;
    }

    /**
     * return - map type
     */
    elementUtilities.getMapType = function(){
        return elementUtilities.mapType;
    }
    /**
     * Resets map type
     */
    elementUtilities.resetMapType = function(){
        elementUtilities.mapType = undefined;
    }

    /**
     * Keep consistency of links to self inside the data() structure.
     * This is needed whenever a node changes parents, for example,
     * as it is destroyed and recreated. But the data() stays identical.
     * This creates inconsistencies for the pointers stored in data(),
     * as they now point to a deleted node.
     */
    elementUtilities.maintainPointer = function (eles) {
      eles.nodes().forEach(function(ele){
        // restore background images
        ele.emit('data');

        // skip nodes without any auxiliary units
        if(!ele.data('statesandinfos') || ele.data('statesandinfos').length == 0) {
          return;
        }
        for(var side in ele.data('auxunitlayouts')) {
          ele.data('auxunitlayouts')[side].parentNode = ele.id();
        }
        for(var i=0; i < ele.data('statesandinfos').length; i++) {
          ele.data('statesandinfos')[i].parent = ele.id();
        }
      });
    }

    elementUtilities.anyHasBackgroundImage = function (eles) {
      var obj = elementUtilities.getBackgroundImageObjs(eles);
      if(obj === undefined)
        return false;
      else{
        for(var key in obj){
          var value = obj[key];
          if(value && !$.isEmptyObject(value))
            return true;
        }
        return false;
      }
    }

    elementUtilities.hasBackgroundImage = function (ele) {
      if(ele.isNode()){
        var bg = ele.data('background-image') ? ele.data('background-image') : "";
        var cloneImg = 'data:image/svg+xml;utf8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20style%3D%22fill%3Anone%3Bstroke%3Ablack%3Bstroke-width%3A0%3B%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20%3E%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22100%22%20height%3D%22100%22%20style%3D%22fill%3A%23a9a9a9%22/%3E%20%3C/svg%3E';
        if(bg !== "" && !(bg.indexOf(cloneImg) > -1 && bg === cloneImg))
          return true;

      }
      return false;
    }

    elementUtilities.getBackgroundImageURL = function (eles) {
      if(!eles || eles.length < 1)
        return;
      
      var commonURL = "";
      for(var i = 0; i < eles.length; i++){
        var ele = eles[i];

        if(!ele.isNode() || !elementUtilities.hasBackgroundImage(ele))
          return;
        
        var url = ele.data('background-image').split(" ").pop();
        if(!url || url.indexOf('http') !== 0 || (commonURL !== "" && commonURL !== url))
          return;
        else if(commonURL === "")
          commonURL = url;
      }
      
      return commonURL;
    }

    elementUtilities.getBackgroundImageObjs = function (eles) {
      if(!eles || eles.length < 1)
        return;

      var list = {};
      for(var i = 0; i < eles.length; i++){
        var ele = eles[i];
        var obj = getBgObj(ele);
        if(obj === undefined)
          return;
        
        list[ele.data('id')] = obj;
      }
      return list;

      function getBgObj (ele) {
        if(ele.isNode() && elementUtilities.hasBackgroundImage(ele)){
          var keys = ['background-image', 'background-fit', 'background-image-opacity',
          'background-position-x', 'background-position-y', 'background-height', 'background-width'];
          
          var obj = {};
          keys.forEach(function(key){
            var arr = ele.data(key);
            obj[key] = arr ? arr : "";
          });
          
          return obj;
        }
        else if(ele.isNode())
          return {};
      }
    }
      
    elementUtilities.getBackgroundFitOptions = function (eles) {
      if(!eles || eles.length < 1)
        return;

      var commonFit = "";
      for(var i = 0; i < eles.length; i++){
        var node = eles[i];
        if(!node.isNode())
          return;

        var fit = getFitOption(node);
        if(!fit || (commonFit !== "" && fit !== commonFit))
          return;
        else if(commonFit === "")
          commonFit = fit;
      }

      var options = '<option value="none">None</option>'
                  + '<option value="fit">Fit</option>'
                  + '<option value="cover">Cover</option>'
                  + '<option value="contain">Contain</option>';
      var searchKey = 'value="' + commonFit + '"';
      var index = options.indexOf(searchKey) + searchKey.length;
      return options.substr(0, index) + ' selected' + options.substr(index);

      function getFitOption(node) {
        if(!elementUtilities.hasBackgroundImage(node))
          return;

        var f = node.data('background-fit');
        var h = node.data('background-height');

        if(!f || !h)
          return;
        
        f = f.split(" ");
        h = h.split(" ");
        if(f[f.length-1] === "none")
          return (h[h.length-1] === "auto" ? "none" : "fit");
        else
          return f[f.length-1];
      }
    }

    elementUtilities.updateBackgroundImage = function (nodes, bgObj) {
      if(!nodes || nodes.length == 0 || !bgObj)
        return;

      for(var i = 0; i < nodes.length; i++){
        var node = nodes[i];
        var obj = bgObj[node.data('id')];
        if(!obj || $.isEmptyObject(obj))
          continue;
        
        var imgs = node.data('background-image') ? node.data('background-image').split(" ") : [];
        var xPos = node.data('background-position-x') ? node.data('background-position-x').split(" ") : [];
        var yPos = node.data('background-position-y') ? node.data('background-position-y').split(" ") : [];
        var widths = node.data('background-width') ? node.data('background-width').split(" ") : [];
        var heights = node.data('background-height') ? node.data('background-height').split(" ") : [];
        var fits = node.data('background-fit') ? node.data('background-fit').split(" ") : [];
        var opacities = node.data('background-image-opacity') ? ("" + node.data('background-image-opacity')).split(" ") : [];
        
        var index = -1;
        if(typeof obj['background-image'] === "string")
          index = imgs.indexOf(obj['background-image']);
        else if(Array.isArray(obj['background-image']))
          index = imgs.indexOf(obj['background-image'][0]);

        if(index < 0)
          continue;

        if(obj['background-image'] && imgs.length > index){
          var tmp = imgs[index];
          imgs[index] = obj['background-image'];
          obj['background-image'] = tmp;
        }
        if(obj['background-fit'] && fits.length > index){
          var tmp = fits[index];
          fits[index] = obj['background-fit'];
          obj['background-fit'] = tmp;
        }
        if(obj['background-width'] && widths.length > index){
          var tmp = widths[index];
          widths[index] = obj['background-width'];
          obj['background-width'] = tmp;
        }
        if(obj['background-height'] && heights.length > index){
          var tmp = heights[index];
          heights[index] = obj['background-height'];
          obj['background-height'] = tmp;
        }
        if(obj['background-position-x'] && xPos.length > index){
          var tmp = xPos[index];
          xPos[index] = obj['background-position-x'];
          obj['background-position-x'] = tmp;
        }
        if(obj['background-position-y'] && yPos.length > index){
          var tmp = yPos[index];
          yPos[index] = obj['background-position-y'];
          obj['background-position-y'] = tmp;
        }
        if(obj['background-image-opacity'] && opacities.length > index){
          var tmp = opacities[index];
          opacities[index] = obj['background-image-opacity'];
          obj['background-image-opacity'] = tmp;
        }

        node.data('background-image', imgs.join(" "));
        node.data('background-position-x', xPos.join(" "));
        node.data('background-position-y', yPos.join(" "));
        node.data('background-width', widths.join(" "));
        node.data('background-height', heights.join(" "));
        node.data('background-fit', fits.join(" "));
        node.data('background-image-opacity', opacities.join(" "));
      }

      return bgObj;
    }

    elementUtilities.changeBackgroundImage = function (nodes, oldImg, newImg, firstTime, updateInfo, promptInvalidImage, validateURL) {
      if(!nodes || nodes.length == 0 || !oldImg || !newImg)
        return;

      elementUtilities.removeBackgroundImage(nodes, oldImg);
      for(var key in newImg){
        newImg[key]['firstTime'] = firstTime;
      }
      elementUtilities.addBackgroundImage(nodes, newImg, updateInfo, promptInvalidImage, validateURL);
      
      return {
        nodes: nodes,
        oldImg: newImg,
        newImg: oldImg,
        firstTime: false,
        promptInvalidImage: promptInvalidImage,
        validateURL: validateURL
      };
    }

    // Add a background image to given nodes.
    elementUtilities.addBackgroundImage = function (nodes, bgObj, updateInfo, promptInvalidImage, validateURL) {
      if(!nodes || nodes.length == 0 || !bgObj)
        return;

      for(var i = 0; i < nodes.length; i++){
        var node = nodes[i];
        var obj = bgObj[node.data('id')];
        if(!obj || $.isEmptyObject(obj))
          continue;
        
        // Load the image from local, else just put the URL
        if(obj['fromFile'])
        loadBackgroundThenApply(node, obj);
        // Validity of given URL should be checked before applying it
        else if(obj['firstTime']){
          if(typeof validateURL === 'function')
            validateURL(node, obj, applyBackground, promptInvalidImage);
          else
            checkGivenURL(node, obj);
        }
        else
          applyBackground(node, obj);
      }

      function loadBackgroundThenApply(node, bgObj) {
        var reader = new FileReader();
        var imgFile = bgObj['background-image'];

        // Check whether given file is an image file
        if(imgFile.type.indexOf("image") !== 0){
          if(promptInvalidImage)
            promptInvalidImage("Invalid image file is given!");
          return;
        }

        reader.readAsDataURL(imgFile);

        reader.onload = function (e) {
          var img = reader.result;
          if(img){
            bgObj['background-image'] = img;
            bgObj['fromFile'] = false;
            applyBackground(node, bgObj);
          }
          else{
            if(promptInvalidImage)
              promptInvalidImage("Given file could not be read!");
          }
        };
      }

      function checkGivenURL(node, bgObj){
        var url = bgObj['background-image'];
        var extension = (url.split(/[?#]/)[0]).split(".").pop();
        var validExtensions = ["png", "svg", "jpg", "jpeg"];

        if(!validExtensions.includes(extension)){
          if(typeof promptInvalidImage === 'function')
            promptInvalidImage("Invalid URL is given!");
          return;
        }

        $.ajax({
          url: url,
          type: 'GET',
          success: function(result, status, xhr){
            applyBackground(node, bgObj);
          },
          error: function(xhr, status, error){
            if(promptInvalidImage)
              promptInvalidImage("Invalid URL is given!");
          },
        });
      }

      function applyBackground(node, bgObj) {

        if(elementUtilities.hasBackgroundImage(node))
          return;
      
        var imgs = node.data('background-image') ? node.data('background-image').split(" ") : [];
        var xPos = node.data('background-position-x') ? node.data('background-position-x').split(" ") : [];
        var yPos = node.data('background-position-y') ? node.data('background-position-y').split(" ") : [];
        var widths = node.data('background-width') ? node.data('background-width').split(" ") : [];
        var heights = node.data('background-height') ? node.data('background-height').split(" ") : [];
        var fits = node.data('background-fit') ? node.data('background-fit').split(" ") : [];
        var opacities = node.data('background-image-opacity') ? ("" + node.data('background-image-opacity')).split(" ") : [];
        
        var indexToInsert = imgs.length;

        // insert to length-1
        if(hasCloneMarker(node, imgs)){
          indexToInsert--;
        }

        imgs.splice(indexToInsert, 0, bgObj['background-image']);
        fits.splice(indexToInsert, 0, bgObj['background-fit']);
        opacities.splice(indexToInsert, 0, bgObj['background-image-opacity']);
        xPos.splice(indexToInsert, 0, bgObj['background-position-x']);
        yPos.splice(indexToInsert, 0, bgObj['background-position-y']);
        widths.splice(indexToInsert, 0, bgObj['background-width']);
        heights.splice(indexToInsert, 0, bgObj['background-height']);

        node.data('background-image', imgs.join(" "));
        node.data('background-position-x', xPos.join(" "));
        node.data('background-position-y', yPos.join(" "));
        node.data('background-width', widths.join(" "));
        node.data('background-height', heights.join(" "));
        node.data('background-fit', fits.join(" "));
        node.data('background-image-opacity', opacities.join(" "));
        bgObj['firstTime'] = false;

        if(updateInfo)
          updateInfo();
        
      }

      function hasCloneMarker(node, imgs){
        var cloneImg = 'data:image/svg+xml;utf8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20style%3D%22fill%3Anone%3Bstroke%3Ablack%3Bstroke-width%3A0%3B%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20%3E%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22100%22%20height%3D%22100%22%20style%3D%22fill%3A%23a9a9a9%22/%3E%20%3C/svg%3E';
        return (imgs.indexOf(cloneImg) > -1);
      }
    };

    // Remove a background image from given nodes.
    elementUtilities.removeBackgroundImage = function (nodes, bgObj) {
      if(!nodes || nodes.length == 0 || !bgObj)
        return;

      for(var i = 0; i < nodes.length; i++){
        var node = nodes[i];
        var obj = bgObj[node.data('id')];
        if(!obj)
          continue;
        
        var imgs = node.data('background-image') ? node.data('background-image').split(" ") : [];
        var xPos = node.data('background-position-x') ? node.data('background-position-x').split(" ") : [];
        var yPos = node.data('background-position-y') ? node.data('background-position-y').split(" ") : [];
        var widths = node.data('background-width') ? node.data('background-width').split(" ") : [];
        var heights = node.data('background-height') ? node.data('background-height').split(" ") : [];
        var fits = node.data('background-fit') ? node.data('background-fit').split(" ") : [];
        var opacities = node.data('background-image-opacity') ? ("" + node.data('background-image-opacity')).split(" ") : [];
        
        var index = -1;
        if(typeof obj['background-image'] === "string")
          index = imgs.indexOf(obj['background-image']);
        else if(Array.isArray(obj['background-image']))
          index = imgs.indexOf(obj['background-image'][0]);

        if(index > -1){
          imgs.splice(index, 1);
          fits.splice(index, 1);
          opacities.splice(index, 1);
          xPos.splice(index, 1);
          yPos.splice(index, 1);
          widths.splice(index, 1);
          heights.splice(index, 1);
        }

        node.data('background-image', imgs.join(" "));
        node.data('background-position-x', xPos.join(" "));
        node.data('background-position-y', yPos.join(" "));
        node.data('background-width', widths.join(" "));
        node.data('background-height', heights.join(" "));
        node.data('background-fit', fits.join(" "));
        node.data('background-image-opacity', opacities.join(" "));
        bgObj['firstTime'] = false;
      }
    };

  }

  return elementUtilitiesExtender;
};
