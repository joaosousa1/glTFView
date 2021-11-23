en

##Modeled in Blender
##Render whith Three.js [https://threejs.org](https://threejs.org)
##glTFView (c) João Sousa 2021

This module insert a (glft or glb) file in web page, add a shadow to the object and create a "RoomEnvironment" (light). Just add a tag width class **glTFView** and insert the properties.

Tag properties:

*  **glTFfile="&lt;path&gt;":**path to file 3d.

*  **auto:** if present the object auto rotate.
 
*  **w="&lt;int&gt;":** canvas width.
 
*  **h="&lt;int&gt;":** canvas high.
 
*  **zoom:** if present enable zoom (mouse wheel) .
 
*  **resize:** if present resize when page resize.
 
*  **transparent:** if present remove canvas background but remove also the shadow.
 
*  **bg="&lt;#hex&gt;":** define background color. (if not present default white)

*  **scale="&ltFloat;&gt;":** define scale. (if not present default 1.0)

Example:

`<div class="glTFView" glTFFile="models/model.gltf" auto zoom w="300" h="300"></div> `

---
pt

##Modelado no Blender
##Renderizado com Three.js [https://threejs.org](https://threejs.org)
##glTFView (c) João Sousa 2021


Este modulo carrega um ficheiro 3D (glft ou glb), adiciona ao canvas um cursor grabbing para rodar o obcjeto, coloca uma sombra no modelo, e cria um "RoomEnvironment". Basta definir uma tag com a classe de **glTFView** e adicionar as propriedades.

Propriedades da tag:

*  **glTFfile="&lt;caminho&gt;":**caminho para o ficheiro 3d.

*  **auto:** se presente o ficheiro roda automaticamente.
 
*  **w="&lt;int&gt;":** largura do canvas.
 
*  **h="&lt;int&gt;":** altura do canvas.
 
*  **zoom:** se presente, permite utilizar o zoom com o mouse whell.
 
*  **resize:** se presente, redimensiona o modelo 3d caso a pagina seja redimensionada.
 
*  **transparent:** se presente, o fundo do canvas fica transparente mas não é adicionado uma sombra.
 
*  **bg="&lt;#hex&gt;":** define a cor do background (esta opção é ignorada quando usado a opção "transparent"), e quando não é definida por omissão a cor de background é branco

*  **scale="&ltFloat;&gt;":** define tamanho. (se não estiver presente o default é 1.0)

Exemplo:

`<div class="glTFView" glTFFile="models/model.gltf" auto zoom w="300" h="300"></div> `