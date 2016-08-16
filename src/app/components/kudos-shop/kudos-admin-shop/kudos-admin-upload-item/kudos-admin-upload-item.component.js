(function () {
    angular
        .module('myApp.admin.components.upload', [])
        .component('kudosAdminUpload', {
            templateUrl: 'app/components/kudos-shop/kudos-admin-shop/kudos-admin-upload-item/kudos-admin-upload-item.html',
            controller: ('AdminUploadItemController', AdminUploadItemController),
            controllerAs: 'upload'
        });

    AdminUploadItemController.$inject = [];

    function AdminUploadItemController() {
        var vm = this;

        var fileName;

        vm.imageChanged = imageChanged;

        vm.$onInit = onInit();

        function onInit() {

        }

        function imageChanged() {
            console.log("changed");
            console.log(vm.file);
            /*var img = vm.file;
            vm.imageUrl = img.toDataURL();
                $('#imageHolder').attr('src', img.toDataURL()).attr('height', 400);*/
        }

        function getOrientation(file, callback) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var view = new DataView(e.target.result);
                if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
                var length = view.byteLength, offset = 2;
                while (offset < length) {
                    var marker = view.getUint16(offset, false);
                    offset += 2;
                    if (marker == 0xFFE1) {
                        if (view.getUint32(offset += 2, false) != 0x45786966) return callback(-1);
                        var little = view.getUint16(offset += 6, false) == 0x4949;
                        offset += view.getUint32(offset + 4, little);
                        var tags = view.getUint16(offset, little);
                        offset += 2;
                        for (var i = 0; i < tags; i++)
                            if (view.getUint16(offset + (i * 12), little) == 0x0112)
                                return callback(view.getUint16(offset + (i * 12) + 8, little));
                    }
                    else if ((marker & 0xFF00) != 0xFF00) break;
                    else offset += view.getUint16(offset, false);
                }
                return callback(-1);
            };
            reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
        }

        function dataURItoFile(dataURI, name) {
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new File([ia], name, {type: mimeString});
        }

    }
})();