function buildColumnsDirective() {
  'ngInject';
   return {
    restrict: 'E',
    scope: {
      columns: '='
    },    
    replace: true,
    template: `                
                
                  <tr>
                    <th>Change List/Build</th>
                    <th>Change List/Build</th>                        
                  </tr>
                
              `
   };
}

export {buildColumnsDirective};