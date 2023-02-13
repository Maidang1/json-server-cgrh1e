(function(){var e={659:function(e,t,n){"use strict";const r=n(127);const i=n(17);const o=n(932).mkdirsSync;const c=n(758).utimesMillisSync;const s=n(913);function copySync(e,t,n){if(typeof n==="function"){n={filter:n}}n=n||{};n.clobber="clobber"in n?!!n.clobber:true;n.overwrite="overwrite"in n?!!n.overwrite:n.clobber;if(n.preserveTimestamps&&process.arch==="ia32"){process.emitWarning("Using the preserveTimestamps option in 32-bit node is not recommended;\n\n"+"\tsee https://github.com/jprichardson/node-fs-extra/issues/269","Warning","fs-extra-WARN0002")}const{srcStat:c,destStat:a}=s.checkPathsSync(e,t,"copy",n);s.checkParentPathsSync(e,c,t,"copy");if(n.filter&&!n.filter(e,t))return;const u=i.dirname(t);if(!r.existsSync(u))o(u);return getStats(a,e,t,n)}function getStats(e,t,n,i){const o=i.dereference?r.statSync:r.lstatSync;const c=o(t);if(c.isDirectory())return onDir(c,e,t,n,i);else if(c.isFile()||c.isCharacterDevice()||c.isBlockDevice())return onFile(c,e,t,n,i);else if(c.isSymbolicLink())return onLink(e,t,n,i);else if(c.isSocket())throw new Error(`Cannot copy a socket file: ${t}`);else if(c.isFIFO())throw new Error(`Cannot copy a FIFO pipe: ${t}`);throw new Error(`Unknown file: ${t}`)}function onFile(e,t,n,r,i){if(!t)return copyFile(e,n,r,i);return mayCopyFile(e,n,r,i)}function mayCopyFile(e,t,n,i){if(i.overwrite){r.unlinkSync(n);return copyFile(e,t,n,i)}else if(i.errorOnExist){throw new Error(`'${n}' already exists`)}}function copyFile(e,t,n,i){r.copyFileSync(t,n);if(i.preserveTimestamps)handleTimestamps(e.mode,t,n);return setDestMode(n,e.mode)}function handleTimestamps(e,t,n){if(fileIsNotWritable(e))makeFileWritable(n,e);return setDestTimestamps(t,n)}function fileIsNotWritable(e){return(e&128)===0}function makeFileWritable(e,t){return setDestMode(e,t|128)}function setDestMode(e,t){return r.chmodSync(e,t)}function setDestTimestamps(e,t){const n=r.statSync(e);return c(t,n.atime,n.mtime)}function onDir(e,t,n,r,i){if(!t)return mkDirAndCopy(e.mode,n,r,i);return copyDir(n,r,i)}function mkDirAndCopy(e,t,n,i){r.mkdirSync(n);copyDir(t,n,i);return setDestMode(n,e)}function copyDir(e,t,n){r.readdirSync(e).forEach((r=>copyDirItem(r,e,t,n)))}function copyDirItem(e,t,n,r){const o=i.join(t,e);const c=i.join(n,e);if(r.filter&&!r.filter(o,c))return;const{destStat:a}=s.checkPathsSync(o,c,"copy",r);return getStats(a,o,c,r)}function onLink(e,t,n,o){let c=r.readlinkSync(t);if(o.dereference){c=i.resolve(process.cwd(),c)}if(!e){return r.symlinkSync(c,n)}else{let e;try{e=r.readlinkSync(n)}catch(e){if(e.code==="EINVAL"||e.code==="UNKNOWN")return r.symlinkSync(c,n);throw e}if(o.dereference){e=i.resolve(process.cwd(),e)}if(s.isSrcSubdir(c,e)){throw new Error(`Cannot copy '${c}' to a subdirectory of itself, '${e}'.`)}if(s.isSrcSubdir(e,c)){throw new Error(`Cannot overwrite '${e}' with '${c}'.`)}return copyLink(c,n)}}function copyLink(e,t){r.unlinkSync(t);return r.symlinkSync(e,t)}e.exports=copySync},796:function(e,t,n){"use strict";const r=n(127);const i=n(17);const o=n(932).mkdirs;const c=n(949).pathExists;const s=n(758).utimesMillis;const a=n(913);function copy(e,t,n,r){if(typeof n==="function"&&!r){r=n;n={}}else if(typeof n==="function"){n={filter:n}}r=r||function(){};n=n||{};n.clobber="clobber"in n?!!n.clobber:true;n.overwrite="overwrite"in n?!!n.overwrite:n.clobber;if(n.preserveTimestamps&&process.arch==="ia32"){process.emitWarning("Using the preserveTimestamps option in 32-bit node is not recommended;\n\n"+"\tsee https://github.com/jprichardson/node-fs-extra/issues/269","Warning","fs-extra-WARN0001")}a.checkPaths(e,t,"copy",n,((i,o)=>{if(i)return r(i);const{srcStat:c,destStat:s}=o;a.checkParentPaths(e,c,t,"copy",(i=>{if(i)return r(i);runFilter(e,t,n,((i,o)=>{if(i)return r(i);if(!o)return r();checkParentDir(s,e,t,n,r)}))}))}))}function checkParentDir(e,t,n,r,s){const a=i.dirname(n);c(a,((i,c)=>{if(i)return s(i);if(c)return getStats(e,t,n,r,s);o(a,(i=>{if(i)return s(i);return getStats(e,t,n,r,s)}))}))}function runFilter(e,t,n,r){if(!n.filter)return r(null,true);Promise.resolve(n.filter(e,t)).then((e=>r(null,e)),(e=>r(e)))}function getStats(e,t,n,i,o){const c=i.dereference?r.stat:r.lstat;c(t,((r,c)=>{if(r)return o(r);if(c.isDirectory())return onDir(c,e,t,n,i,o);else if(c.isFile()||c.isCharacterDevice()||c.isBlockDevice())return onFile(c,e,t,n,i,o);else if(c.isSymbolicLink())return onLink(e,t,n,i,o);else if(c.isSocket())return o(new Error(`Cannot copy a socket file: ${t}`));else if(c.isFIFO())return o(new Error(`Cannot copy a FIFO pipe: ${t}`));return o(new Error(`Unknown file: ${t}`))}))}function onFile(e,t,n,r,i,o){if(!t)return copyFile(e,n,r,i,o);return mayCopyFile(e,n,r,i,o)}function mayCopyFile(e,t,n,i,o){if(i.overwrite){r.unlink(n,(r=>{if(r)return o(r);return copyFile(e,t,n,i,o)}))}else if(i.errorOnExist){return o(new Error(`'${n}' already exists`))}else return o()}function copyFile(e,t,n,i,o){r.copyFile(t,n,(r=>{if(r)return o(r);if(i.preserveTimestamps)return handleTimestampsAndMode(e.mode,t,n,o);return setDestMode(n,e.mode,o)}))}function handleTimestampsAndMode(e,t,n,r){if(fileIsNotWritable(e)){return makeFileWritable(n,e,(i=>{if(i)return r(i);return setDestTimestampsAndMode(e,t,n,r)}))}return setDestTimestampsAndMode(e,t,n,r)}function fileIsNotWritable(e){return(e&128)===0}function makeFileWritable(e,t,n){return setDestMode(e,t|128,n)}function setDestTimestampsAndMode(e,t,n,r){setDestTimestamps(t,n,(t=>{if(t)return r(t);return setDestMode(n,e,r)}))}function setDestMode(e,t,n){return r.chmod(e,t,n)}function setDestTimestamps(e,t,n){r.stat(e,((e,r)=>{if(e)return n(e);return s(t,r.atime,r.mtime,n)}))}function onDir(e,t,n,r,i,o){if(!t)return mkDirAndCopy(e.mode,n,r,i,o);return copyDir(n,r,i,o)}function mkDirAndCopy(e,t,n,i,o){r.mkdir(n,(r=>{if(r)return o(r);copyDir(t,n,i,(t=>{if(t)return o(t);return setDestMode(n,e,o)}))}))}function copyDir(e,t,n,i){r.readdir(e,((r,o)=>{if(r)return i(r);return copyDirItems(o,e,t,n,i)}))}function copyDirItems(e,t,n,r,i){const o=e.pop();if(!o)return i();return copyDirItem(e,o,t,n,r,i)}function copyDirItem(e,t,n,r,o,c){const s=i.join(n,t);const u=i.join(r,t);runFilter(s,u,o,((t,i)=>{if(t)return c(t);if(!i)return copyDirItems(e,n,r,o,c);a.checkPaths(s,u,"copy",o,((t,i)=>{if(t)return c(t);const{destStat:a}=i;getStats(a,s,u,o,(t=>{if(t)return c(t);return copyDirItems(e,n,r,o,c)}))}))}))}function onLink(e,t,n,o,c){r.readlink(t,((t,s)=>{if(t)return c(t);if(o.dereference){s=i.resolve(process.cwd(),s)}if(!e){return r.symlink(s,n,c)}else{r.readlink(n,((e,t)=>{if(e){if(e.code==="EINVAL"||e.code==="UNKNOWN")return r.symlink(s,n,c);return c(e)}if(o.dereference){t=i.resolve(process.cwd(),t)}if(a.isSrcSubdir(s,t)){return c(new Error(`Cannot copy '${s}' to a subdirectory of itself, '${t}'.`))}if(a.isSrcSubdir(t,s)){return c(new Error(`Cannot overwrite '${t}' with '${s}'.`))}return copyLink(s,n,c)}))}}))}function copyLink(e,t,n){r.unlink(t,(i=>{if(i)return n(i);return r.symlink(e,t,n)}))}e.exports=copy},80:function(e,t,n){"use strict";const r=n(5).fromCallback;e.exports={copy:r(n(796)),copySync:n(659)}},116:function(e,t,n){"use strict";const r=n(5).fromPromise;const i=n(463);const o=n(17);const c=n(932);const s=n(655);const a=r((async function emptyDir(e){let t;try{t=await i.readdir(e)}catch{return c.mkdirs(e)}return Promise.all(t.map((t=>s.remove(o.join(e,t)))))}));function emptyDirSync(e){let t;try{t=i.readdirSync(e)}catch{return c.mkdirsSync(e)}t.forEach((t=>{t=o.join(e,t);s.removeSync(t)}))}e.exports={emptyDirSync:emptyDirSync,emptydirSync:emptyDirSync,emptyDir:a,emptydir:a}},169:function(e,t,n){"use strict";const r=n(5).fromCallback;const i=n(17);const o=n(127);const c=n(932);function createFile(e,t){function makeFile(){o.writeFile(e,"",(e=>{if(e)return t(e);t()}))}o.stat(e,((n,r)=>{if(!n&&r.isFile())return t();const s=i.dirname(e);o.stat(s,((e,n)=>{if(e){if(e.code==="ENOENT"){return c.mkdirs(s,(e=>{if(e)return t(e);makeFile()}))}return t(e)}if(n.isDirectory())makeFile();else{o.readdir(s,(e=>{if(e)return t(e)}))}}))}))}function createFileSync(e){let t;try{t=o.statSync(e)}catch{}if(t&&t.isFile())return;const n=i.dirname(e);try{if(!o.statSync(n).isDirectory()){o.readdirSync(n)}}catch(e){if(e&&e.code==="ENOENT")c.mkdirsSync(n);else throw e}o.writeFileSync(e,"")}e.exports={createFile:r(createFile),createFileSync:createFileSync}},262:function(e,t,n){"use strict";const{createFile:r,createFileSync:i}=n(169);const{createLink:o,createLinkSync:c}=n(331);const{createSymlink:s,createSymlinkSync:a}=n(258);e.exports={createFile:r,createFileSync:i,ensureFile:r,ensureFileSync:i,createLink:o,createLinkSync:c,ensureLink:o,ensureLinkSync:c,createSymlink:s,createSymlinkSync:a,ensureSymlink:s,ensureSymlinkSync:a}},331:function(e,t,n){"use strict";const r=n(5).fromCallback;const i=n(17);const o=n(127);const c=n(932);const s=n(949).pathExists;const{areIdentical:a}=n(913);function createLink(e,t,n){function makeLink(e,t){o.link(e,t,(e=>{if(e)return n(e);n(null)}))}o.lstat(t,((r,u)=>{o.lstat(e,((r,o)=>{if(r){r.message=r.message.replace("lstat","ensureLink");return n(r)}if(u&&a(o,u))return n(null);const f=i.dirname(t);s(f,((r,i)=>{if(r)return n(r);if(i)return makeLink(e,t);c.mkdirs(f,(r=>{if(r)return n(r);makeLink(e,t)}))}))}))}))}function createLinkSync(e,t){let n;try{n=o.lstatSync(t)}catch{}try{const t=o.lstatSync(e);if(n&&a(t,n))return}catch(e){e.message=e.message.replace("lstat","ensureLink");throw e}const r=i.dirname(t);const s=o.existsSync(r);if(s)return o.linkSync(e,t);c.mkdirsSync(r);return o.linkSync(e,t)}e.exports={createLink:r(createLink),createLinkSync:createLinkSync}},97:function(e,t,n){"use strict";const r=n(17);const i=n(127);const o=n(949).pathExists;function symlinkPaths(e,t,n){if(r.isAbsolute(e)){return i.lstat(e,(t=>{if(t){t.message=t.message.replace("lstat","ensureSymlink");return n(t)}return n(null,{toCwd:e,toDst:e})}))}else{const c=r.dirname(t);const s=r.join(c,e);return o(s,((t,o)=>{if(t)return n(t);if(o){return n(null,{toCwd:s,toDst:e})}else{return i.lstat(e,(t=>{if(t){t.message=t.message.replace("lstat","ensureSymlink");return n(t)}return n(null,{toCwd:e,toDst:r.relative(c,e)})}))}}))}}function symlinkPathsSync(e,t){let n;if(r.isAbsolute(e)){n=i.existsSync(e);if(!n)throw new Error("absolute srcpath does not exist");return{toCwd:e,toDst:e}}else{const o=r.dirname(t);const c=r.join(o,e);n=i.existsSync(c);if(n){return{toCwd:c,toDst:e}}else{n=i.existsSync(e);if(!n)throw new Error("relative srcpath does not exist");return{toCwd:e,toDst:r.relative(o,e)}}}}e.exports={symlinkPaths:symlinkPaths,symlinkPathsSync:symlinkPathsSync}},944:function(e,t,n){"use strict";const r=n(127);function symlinkType(e,t,n){n=typeof t==="function"?t:n;t=typeof t==="function"?false:t;if(t)return n(null,t);r.lstat(e,((e,r)=>{if(e)return n(null,"file");t=r&&r.isDirectory()?"dir":"file";n(null,t)}))}function symlinkTypeSync(e,t){let n;if(t)return t;try{n=r.lstatSync(e)}catch{return"file"}return n&&n.isDirectory()?"dir":"file"}e.exports={symlinkType:symlinkType,symlinkTypeSync:symlinkTypeSync}},258:function(e,t,n){"use strict";const r=n(5).fromCallback;const i=n(17);const o=n(463);const c=n(932);const s=c.mkdirs;const a=c.mkdirsSync;const u=n(97);const f=u.symlinkPaths;const l=u.symlinkPathsSync;const y=n(944);const p=y.symlinkType;const m=y.symlinkTypeSync;const d=n(949).pathExists;const{areIdentical:h}=n(913);function createSymlink(e,t,n,r){r=typeof n==="function"?n:r;n=typeof n==="function"?false:n;o.lstat(t,((i,c)=>{if(!i&&c.isSymbolicLink()){Promise.all([o.stat(e),o.stat(t)]).then((([i,o])=>{if(h(i,o))return r(null);_createSymlink(e,t,n,r)}))}else _createSymlink(e,t,n,r)}))}function _createSymlink(e,t,n,r){f(e,t,((c,a)=>{if(c)return r(c);e=a.toDst;p(a.toCwd,n,((n,c)=>{if(n)return r(n);const a=i.dirname(t);d(a,((n,i)=>{if(n)return r(n);if(i)return o.symlink(e,t,c,r);s(a,(n=>{if(n)return r(n);o.symlink(e,t,c,r)}))}))}))}))}function createSymlinkSync(e,t,n){let r;try{r=o.lstatSync(t)}catch{}if(r&&r.isSymbolicLink()){const n=o.statSync(e);const r=o.statSync(t);if(h(n,r))return}const c=l(e,t);e=c.toDst;n=m(c.toCwd,n);const s=i.dirname(t);const u=o.existsSync(s);if(u)return o.symlinkSync(e,t,n);a(s);return o.symlinkSync(e,t,n)}e.exports={createSymlink:r(createSymlink),createSymlinkSync:createSymlinkSync}},463:function(e,t,n){"use strict";const r=n(5).fromCallback;const i=n(127);const o=["access","appendFile","chmod","chown","close","copyFile","fchmod","fchown","fdatasync","fstat","fsync","ftruncate","futimes","lchmod","lchown","link","lstat","mkdir","mkdtemp","open","opendir","readdir","readFile","readlink","realpath","rename","rm","rmdir","stat","symlink","truncate","unlink","utimes","writeFile"].filter((e=>typeof i[e]==="function"));Object.assign(t,i);o.forEach((e=>{t[e]=r(i[e])}));t.exists=function(e,t){if(typeof t==="function"){return i.exists(e,t)}return new Promise((t=>i.exists(e,t)))};t.read=function(e,t,n,r,o,c){if(typeof c==="function"){return i.read(e,t,n,r,o,c)}return new Promise(((c,s)=>{i.read(e,t,n,r,o,((e,t,n)=>{if(e)return s(e);c({bytesRead:t,buffer:n})}))}))};t.write=function(e,t,...n){if(typeof n[n.length-1]==="function"){return i.write(e,t,...n)}return new Promise(((r,o)=>{i.write(e,t,...n,((e,t,n)=>{if(e)return o(e);r({bytesWritten:t,buffer:n})}))}))};t.readv=function(e,t,...n){if(typeof n[n.length-1]==="function"){return i.readv(e,t,...n)}return new Promise(((r,o)=>{i.readv(e,t,...n,((e,t,n)=>{if(e)return o(e);r({bytesRead:t,buffers:n})}))}))};t.writev=function(e,t,...n){if(typeof n[n.length-1]==="function"){return i.writev(e,t,...n)}return new Promise(((r,o)=>{i.writev(e,t,...n,((e,t,n)=>{if(e)return o(e);r({bytesWritten:t,buffers:n})}))}))};if(typeof i.realpath.native==="function"){t.realpath.native=r(i.realpath.native)}else{process.emitWarning("fs.realpath.native is not a function. Is fs being monkey-patched?","Warning","fs-extra-WARN0003")}},579:function(e,t,n){"use strict";e.exports={...n(463),...n(80),...n(116),...n(262),...n(298),...n(932),...n(149),...n(451),...n(949),...n(655)}},298:function(e,t,n){"use strict";const r=n(5).fromPromise;const i=n(317);i.outputJson=r(n(234));i.outputJsonSync=n(297);i.outputJSON=i.outputJson;i.outputJSONSync=i.outputJsonSync;i.writeJSON=i.writeJson;i.writeJSONSync=i.writeJsonSync;i.readJSON=i.readJson;i.readJSONSync=i.readJsonSync;e.exports=i},317:function(e,t,n){"use strict";const r=n(654);e.exports={readJson:r.readFile,readJsonSync:r.readFileSync,writeJson:r.writeFile,writeJsonSync:r.writeFileSync}},297:function(e,t,n){"use strict";const{stringify:r}=n(208);const{outputFileSync:i}=n(451);function outputJsonSync(e,t,n){const o=r(t,n);i(e,o,n)}e.exports=outputJsonSync},234:function(e,t,n){"use strict";const{stringify:r}=n(208);const{outputFile:i}=n(451);async function outputJson(e,t,n={}){const o=r(t,n);await i(e,o,n)}e.exports=outputJson},932:function(e,t,n){"use strict";const r=n(5).fromPromise;const{makeDir:i,makeDirSync:o}=n(768);const c=r(i);e.exports={mkdirs:c,mkdirsSync:o,mkdirp:c,mkdirpSync:o,ensureDir:c,ensureDirSync:o}},768:function(e,t,n){"use strict";const r=n(463);const{checkPath:i}=n(349);const getMode=e=>{const t={mode:511};if(typeof e==="number")return e;return{...t,...e}.mode};e.exports.makeDir=async(e,t)=>{i(e);return r.mkdir(e,{mode:getMode(t),recursive:true})};e.exports.makeDirSync=(e,t)=>{i(e);return r.mkdirSync(e,{mode:getMode(t),recursive:true})}},349:function(e,t,n){"use strict";const r=n(17);e.exports.checkPath=function checkPath(e){if(process.platform==="win32"){const t=/[<>:"|?*]/.test(e.replace(r.parse(e).root,""));if(t){const t=new Error(`Path contains invalid characters: ${e}`);t.code="EINVAL";throw t}}}},149:function(e,t,n){"use strict";const r=n(5).fromCallback;e.exports={move:r(n(186)),moveSync:n(663)}},663:function(e,t,n){"use strict";const r=n(127);const i=n(17);const o=n(80).copySync;const c=n(655).removeSync;const s=n(932).mkdirpSync;const a=n(913);function moveSync(e,t,n){n=n||{};const r=n.overwrite||n.clobber||false;const{srcStat:o,isChangingCase:c=false}=a.checkPathsSync(e,t,"move",n);a.checkParentPathsSync(e,o,t,"move");if(!isParentRoot(t))s(i.dirname(t));return doRename(e,t,r,c)}function isParentRoot(e){const t=i.dirname(e);const n=i.parse(t);return n.root===t}function doRename(e,t,n,i){if(i)return rename(e,t,n);if(n){c(t);return rename(e,t,n)}if(r.existsSync(t))throw new Error("dest already exists.");return rename(e,t,n)}function rename(e,t,n){try{r.renameSync(e,t)}catch(r){if(r.code!=="EXDEV")throw r;return moveAcrossDevice(e,t,n)}}function moveAcrossDevice(e,t,n){const r={overwrite:n,errorOnExist:true};o(e,t,r);return c(e)}e.exports=moveSync},186:function(e,t,n){"use strict";const r=n(127);const i=n(17);const o=n(80).copy;const c=n(655).remove;const s=n(932).mkdirp;const a=n(949).pathExists;const u=n(913);function move(e,t,n,r){if(typeof n==="function"){r=n;n={}}n=n||{};const o=n.overwrite||n.clobber||false;u.checkPaths(e,t,"move",n,((n,c)=>{if(n)return r(n);const{srcStat:a,isChangingCase:f=false}=c;u.checkParentPaths(e,a,t,"move",(n=>{if(n)return r(n);if(isParentRoot(t))return doRename(e,t,o,f,r);s(i.dirname(t),(n=>{if(n)return r(n);return doRename(e,t,o,f,r)}))}))}))}function isParentRoot(e){const t=i.dirname(e);const n=i.parse(t);return n.root===t}function doRename(e,t,n,r,i){if(r)return rename(e,t,n,i);if(n){return c(t,(r=>{if(r)return i(r);return rename(e,t,n,i)}))}a(t,((r,o)=>{if(r)return i(r);if(o)return i(new Error("dest already exists."));return rename(e,t,n,i)}))}function rename(e,t,n,i){r.rename(e,t,(r=>{if(!r)return i();if(r.code!=="EXDEV")return i(r);return moveAcrossDevice(e,t,n,i)}))}function moveAcrossDevice(e,t,n,r){const i={overwrite:n,errorOnExist:true};o(e,t,i,(t=>{if(t)return r(t);return c(e,r)}))}e.exports=move},451:function(e,t,n){"use strict";const r=n(5).fromCallback;const i=n(127);const o=n(17);const c=n(932);const s=n(949).pathExists;function outputFile(e,t,n,r){if(typeof n==="function"){r=n;n="utf8"}const a=o.dirname(e);s(a,((o,s)=>{if(o)return r(o);if(s)return i.writeFile(e,t,n,r);c.mkdirs(a,(o=>{if(o)return r(o);i.writeFile(e,t,n,r)}))}))}function outputFileSync(e,...t){const n=o.dirname(e);if(i.existsSync(n)){return i.writeFileSync(e,...t)}c.mkdirsSync(n);i.writeFileSync(e,...t)}e.exports={outputFile:r(outputFile),outputFileSync:outputFileSync}},949:function(e,t,n){"use strict";const r=n(5).fromPromise;const i=n(463);function pathExists(e){return i.access(e).then((()=>true)).catch((()=>false))}e.exports={pathExists:r(pathExists),pathExistsSync:i.existsSync}},655:function(e,t,n){"use strict";const r=n(127);const i=n(5).fromCallback;function remove(e,t){r.rm(e,{recursive:true,force:true},t)}function removeSync(e){r.rmSync(e,{recursive:true,force:true})}e.exports={remove:i(remove),removeSync:removeSync}},913:function(e,t,n){"use strict";const r=n(463);const i=n(17);const o=n(837);function getStats(e,t,n){const i=n.dereference?e=>r.stat(e,{bigint:true}):e=>r.lstat(e,{bigint:true});return Promise.all([i(e),i(t).catch((e=>{if(e.code==="ENOENT")return null;throw e}))]).then((([e,t])=>({srcStat:e,destStat:t})))}function getStatsSync(e,t,n){let i;const o=n.dereference?e=>r.statSync(e,{bigint:true}):e=>r.lstatSync(e,{bigint:true});const c=o(e);try{i=o(t)}catch(e){if(e.code==="ENOENT")return{srcStat:c,destStat:null};throw e}return{srcStat:c,destStat:i}}function checkPaths(e,t,n,r,c){o.callbackify(getStats)(e,t,r,((r,o)=>{if(r)return c(r);const{srcStat:s,destStat:a}=o;if(a){if(areIdentical(s,a)){const r=i.basename(e);const o=i.basename(t);if(n==="move"&&r!==o&&r.toLowerCase()===o.toLowerCase()){return c(null,{srcStat:s,destStat:a,isChangingCase:true})}return c(new Error("Source and destination must not be the same."))}if(s.isDirectory()&&!a.isDirectory()){return c(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`))}if(!s.isDirectory()&&a.isDirectory()){return c(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`))}}if(s.isDirectory()&&isSrcSubdir(e,t)){return c(new Error(errMsg(e,t,n)))}return c(null,{srcStat:s,destStat:a})}))}function checkPathsSync(e,t,n,r){const{srcStat:o,destStat:c}=getStatsSync(e,t,r);if(c){if(areIdentical(o,c)){const r=i.basename(e);const s=i.basename(t);if(n==="move"&&r!==s&&r.toLowerCase()===s.toLowerCase()){return{srcStat:o,destStat:c,isChangingCase:true}}throw new Error("Source and destination must not be the same.")}if(o.isDirectory()&&!c.isDirectory()){throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`)}if(!o.isDirectory()&&c.isDirectory()){throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`)}}if(o.isDirectory()&&isSrcSubdir(e,t)){throw new Error(errMsg(e,t,n))}return{srcStat:o,destStat:c}}function checkParentPaths(e,t,n,o,c){const s=i.resolve(i.dirname(e));const a=i.resolve(i.dirname(n));if(a===s||a===i.parse(a).root)return c();r.stat(a,{bigint:true},((r,i)=>{if(r){if(r.code==="ENOENT")return c();return c(r)}if(areIdentical(t,i)){return c(new Error(errMsg(e,n,o)))}return checkParentPaths(e,t,a,o,c)}))}function checkParentPathsSync(e,t,n,o){const c=i.resolve(i.dirname(e));const s=i.resolve(i.dirname(n));if(s===c||s===i.parse(s).root)return;let a;try{a=r.statSync(s,{bigint:true})}catch(e){if(e.code==="ENOENT")return;throw e}if(areIdentical(t,a)){throw new Error(errMsg(e,n,o))}return checkParentPathsSync(e,t,s,o)}function areIdentical(e,t){return t.ino&&t.dev&&t.ino===e.ino&&t.dev===e.dev}function isSrcSubdir(e,t){const n=i.resolve(e).split(i.sep).filter((e=>e));const r=i.resolve(t).split(i.sep).filter((e=>e));return n.reduce(((e,t,n)=>e&&r[n]===t),true)}function errMsg(e,t,n){return`Cannot ${n} '${e}' to a subdirectory of itself, '${t}'.`}e.exports={checkPaths:checkPaths,checkPathsSync:checkPathsSync,checkParentPaths:checkParentPaths,checkParentPathsSync:checkParentPathsSync,isSrcSubdir:isSrcSubdir,areIdentical:areIdentical}},758:function(e,t,n){"use strict";const r=n(127);function utimesMillis(e,t,n,i){r.open(e,"r+",((e,o)=>{if(e)return i(e);r.futimes(o,t,n,(e=>{r.close(o,(t=>{if(i)i(e||t)}))}))}))}function utimesMillisSync(e,t,n){const i=r.openSync(e,"r+");r.futimesSync(i,t,n);return r.closeSync(i)}e.exports={utimesMillis:utimesMillis,utimesMillisSync:utimesMillisSync}},132:function(e){"use strict";e.exports=clone;var t=Object.getPrototypeOf||function(e){return e.__proto__};function clone(e){if(e===null||typeof e!=="object")return e;if(e instanceof Object)var n={__proto__:t(e)};else var n=Object.create(null);Object.getOwnPropertyNames(e).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}));return n}},127:function(e,t,n){var r=n(147);var i=n(367);var o=n(876);var c=n(132);var s=n(837);var a;var u;if(typeof Symbol==="function"&&typeof Symbol.for==="function"){a=Symbol.for("graceful-fs.queue");u=Symbol.for("graceful-fs.previous")}else{a="___graceful-fs.queue";u="___graceful-fs.previous"}function noop(){}function publishQueue(e,t){Object.defineProperty(e,a,{get:function(){return t}})}var f=noop;if(s.debuglog)f=s.debuglog("gfs4");else if(/\bgfs4\b/i.test(process.env.NODE_DEBUG||""))f=function(){var e=s.format.apply(s,arguments);e="GFS4: "+e.split(/\n/).join("\nGFS4: ");console.error(e)};if(!r[a]){var l=global[a]||[];publishQueue(r,l);r.close=function(e){function close(t,n){return e.call(r,t,(function(e){if(!e){resetQueue()}if(typeof n==="function")n.apply(this,arguments)}))}Object.defineProperty(close,u,{value:e});return close}(r.close);r.closeSync=function(e){function closeSync(t){e.apply(r,arguments);resetQueue()}Object.defineProperty(closeSync,u,{value:e});return closeSync}(r.closeSync);if(/\bgfs4\b/i.test(process.env.NODE_DEBUG||"")){process.on("exit",(function(){f(r[a]);n(491).equal(r[a].length,0)}))}}if(!global[a]){publishQueue(global,r[a])}e.exports=patch(c(r));if(process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH&&!r.__patched){e.exports=patch(r);r.__patched=true}function patch(e){i(e);e.gracefulify=patch;e.createReadStream=createReadStream;e.createWriteStream=createWriteStream;var t=e.readFile;e.readFile=readFile;function readFile(e,n,r){if(typeof n==="function")r=n,n=null;return go$readFile(e,n,r);function go$readFile(e,n,r,i){return t(e,n,(function(t){if(t&&(t.code==="EMFILE"||t.code==="ENFILE"))enqueue([go$readFile,[e,n,r],t,i||Date.now(),Date.now()]);else{if(typeof r==="function")r.apply(this,arguments)}}))}}var n=e.writeFile;e.writeFile=writeFile;function writeFile(e,t,r,i){if(typeof r==="function")i=r,r=null;return go$writeFile(e,t,r,i);function go$writeFile(e,t,r,i,o){return n(e,t,r,(function(n){if(n&&(n.code==="EMFILE"||n.code==="ENFILE"))enqueue([go$writeFile,[e,t,r,i],n,o||Date.now(),Date.now()]);else{if(typeof i==="function")i.apply(this,arguments)}}))}}var r=e.appendFile;if(r)e.appendFile=appendFile;function appendFile(e,t,n,i){if(typeof n==="function")i=n,n=null;return go$appendFile(e,t,n,i);function go$appendFile(e,t,n,i,o){return r(e,t,n,(function(r){if(r&&(r.code==="EMFILE"||r.code==="ENFILE"))enqueue([go$appendFile,[e,t,n,i],r,o||Date.now(),Date.now()]);else{if(typeof i==="function")i.apply(this,arguments)}}))}}var c=e.copyFile;if(c)e.copyFile=copyFile;function copyFile(e,t,n,r){if(typeof n==="function"){r=n;n=0}return go$copyFile(e,t,n,r);function go$copyFile(e,t,n,r,i){return c(e,t,n,(function(o){if(o&&(o.code==="EMFILE"||o.code==="ENFILE"))enqueue([go$copyFile,[e,t,n,r],o,i||Date.now(),Date.now()]);else{if(typeof r==="function")r.apply(this,arguments)}}))}}var s=e.readdir;e.readdir=readdir;var a=/^v[0-5]\./;function readdir(e,t,n){if(typeof t==="function")n=t,t=null;var r=a.test(process.version)?function go$readdir(e,t,n,r){return s(e,fs$readdirCallback(e,t,n,r))}:function go$readdir(e,t,n,r){return s(e,t,fs$readdirCallback(e,t,n,r))};return r(e,t,n);function fs$readdirCallback(e,t,n,i){return function(o,c){if(o&&(o.code==="EMFILE"||o.code==="ENFILE"))enqueue([r,[e,t,n],o,i||Date.now(),Date.now()]);else{if(c&&c.sort)c.sort();if(typeof n==="function")n.call(this,o,c)}}}}if(process.version.substr(0,4)==="v0.8"){var u=o(e);ReadStream=u.ReadStream;WriteStream=u.WriteStream}var f=e.ReadStream;if(f){ReadStream.prototype=Object.create(f.prototype);ReadStream.prototype.open=ReadStream$open}var l=e.WriteStream;if(l){WriteStream.prototype=Object.create(l.prototype);WriteStream.prototype.open=WriteStream$open}Object.defineProperty(e,"ReadStream",{get:function(){return ReadStream},set:function(e){ReadStream=e},enumerable:true,configurable:true});Object.defineProperty(e,"WriteStream",{get:function(){return WriteStream},set:function(e){WriteStream=e},enumerable:true,configurable:true});var y=ReadStream;Object.defineProperty(e,"FileReadStream",{get:function(){return y},set:function(e){y=e},enumerable:true,configurable:true});var p=WriteStream;Object.defineProperty(e,"FileWriteStream",{get:function(){return p},set:function(e){p=e},enumerable:true,configurable:true});function ReadStream(e,t){if(this instanceof ReadStream)return f.apply(this,arguments),this;else return ReadStream.apply(Object.create(ReadStream.prototype),arguments)}function ReadStream$open(){var e=this;open(e.path,e.flags,e.mode,(function(t,n){if(t){if(e.autoClose)e.destroy();e.emit("error",t)}else{e.fd=n;e.emit("open",n);e.read()}}))}function WriteStream(e,t){if(this instanceof WriteStream)return l.apply(this,arguments),this;else return WriteStream.apply(Object.create(WriteStream.prototype),arguments)}function WriteStream$open(){var e=this;open(e.path,e.flags,e.mode,(function(t,n){if(t){e.destroy();e.emit("error",t)}else{e.fd=n;e.emit("open",n)}}))}function createReadStream(t,n){return new e.ReadStream(t,n)}function createWriteStream(t,n){return new e.WriteStream(t,n)}var m=e.open;e.open=open;function open(e,t,n,r){if(typeof n==="function")r=n,n=null;return go$open(e,t,n,r);function go$open(e,t,n,r,i){return m(e,t,n,(function(o,c){if(o&&(o.code==="EMFILE"||o.code==="ENFILE"))enqueue([go$open,[e,t,n,r],o,i||Date.now(),Date.now()]);else{if(typeof r==="function")r.apply(this,arguments)}}))}}return e}function enqueue(e){f("ENQUEUE",e[0].name,e[1]);r[a].push(e);retry()}var y;function resetQueue(){var e=Date.now();for(var t=0;t<r[a].length;++t){if(r[a][t].length>2){r[a][t][3]=e;r[a][t][4]=e}}retry()}function retry(){clearTimeout(y);y=undefined;if(r[a].length===0)return;var e=r[a].shift();var t=e[0];var n=e[1];var i=e[2];var o=e[3];var c=e[4];if(o===undefined){f("RETRY",t.name,n);t.apply(null,n)}else if(Date.now()-o>=6e4){f("TIMEOUT",t.name,n);var s=n.pop();if(typeof s==="function")s.call(null,i)}else{var u=Date.now()-c;var l=Math.max(c-o,1);var p=Math.min(l*1.2,100);if(u>=p){f("RETRY",t.name,n);t.apply(null,n.concat([o]))}else{r[a].push(e)}}if(y===undefined){y=setTimeout(retry,0)}}},876:function(e,t,n){var r=n(781).Stream;e.exports=legacy;function legacy(e){return{ReadStream:ReadStream,WriteStream:WriteStream};function ReadStream(t,n){if(!(this instanceof ReadStream))return new ReadStream(t,n);r.call(this);var i=this;this.path=t;this.fd=null;this.readable=true;this.paused=false;this.flags="r";this.mode=438;this.bufferSize=64*1024;n=n||{};var o=Object.keys(n);for(var c=0,s=o.length;c<s;c++){var a=o[c];this[a]=n[a]}if(this.encoding)this.setEncoding(this.encoding);if(this.start!==undefined){if("number"!==typeof this.start){throw TypeError("start must be a Number")}if(this.end===undefined){this.end=Infinity}else if("number"!==typeof this.end){throw TypeError("end must be a Number")}if(this.start>this.end){throw new Error("start must be <= end")}this.pos=this.start}if(this.fd!==null){process.nextTick((function(){i._read()}));return}e.open(this.path,this.flags,this.mode,(function(e,t){if(e){i.emit("error",e);i.readable=false;return}i.fd=t;i.emit("open",t);i._read()}))}function WriteStream(t,n){if(!(this instanceof WriteStream))return new WriteStream(t,n);r.call(this);this.path=t;this.fd=null;this.writable=true;this.flags="w";this.encoding="binary";this.mode=438;this.bytesWritten=0;n=n||{};var i=Object.keys(n);for(var o=0,c=i.length;o<c;o++){var s=i[o];this[s]=n[s]}if(this.start!==undefined){if("number"!==typeof this.start){throw TypeError("start must be a Number")}if(this.start<0){throw new Error("start must be >= zero")}this.pos=this.start}this.busy=false;this._queue=[];if(this.fd===null){this._open=e.open;this._queue.push([this._open,this.path,this.flags,this.mode,undefined]);this.flush()}}}},367:function(e,t,n){var r=n(57);var i=process.cwd;var o=null;var c=process.env.GRACEFUL_FS_PLATFORM||process.platform;process.cwd=function(){if(!o)o=i.call(process);return o};try{process.cwd()}catch(e){}if(typeof process.chdir==="function"){var s=process.chdir;process.chdir=function(e){o=null;s.call(process,e)};if(Object.setPrototypeOf)Object.setPrototypeOf(process.chdir,s)}e.exports=patch;function patch(e){if(r.hasOwnProperty("O_SYMLINK")&&process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)){patchLchmod(e)}if(!e.lutimes){patchLutimes(e)}e.chown=chownFix(e.chown);e.fchown=chownFix(e.fchown);e.lchown=chownFix(e.lchown);e.chmod=chmodFix(e.chmod);e.fchmod=chmodFix(e.fchmod);e.lchmod=chmodFix(e.lchmod);e.chownSync=chownFixSync(e.chownSync);e.fchownSync=chownFixSync(e.fchownSync);e.lchownSync=chownFixSync(e.lchownSync);e.chmodSync=chmodFixSync(e.chmodSync);e.fchmodSync=chmodFixSync(e.fchmodSync);e.lchmodSync=chmodFixSync(e.lchmodSync);e.stat=statFix(e.stat);e.fstat=statFix(e.fstat);e.lstat=statFix(e.lstat);e.statSync=statFixSync(e.statSync);e.fstatSync=statFixSync(e.fstatSync);e.lstatSync=statFixSync(e.lstatSync);if(e.chmod&&!e.lchmod){e.lchmod=function(e,t,n){if(n)process.nextTick(n)};e.lchmodSync=function(){}}if(e.chown&&!e.lchown){e.lchown=function(e,t,n,r){if(r)process.nextTick(r)};e.lchownSync=function(){}}if(c==="win32"){e.rename=typeof e.rename!=="function"?e.rename:function(t){function rename(n,r,i){var o=Date.now();var c=0;t(n,r,(function CB(s){if(s&&(s.code==="EACCES"||s.code==="EPERM")&&Date.now()-o<6e4){setTimeout((function(){e.stat(r,(function(e,o){if(e&&e.code==="ENOENT")t(n,r,CB);else i(s)}))}),c);if(c<100)c+=10;return}if(i)i(s)}))}if(Object.setPrototypeOf)Object.setPrototypeOf(rename,t);return rename}(e.rename)}e.read=typeof e.read!=="function"?e.read:function(t){function read(n,r,i,o,c,s){var a;if(s&&typeof s==="function"){var u=0;a=function(f,l,y){if(f&&f.code==="EAGAIN"&&u<10){u++;return t.call(e,n,r,i,o,c,a)}s.apply(this,arguments)}}return t.call(e,n,r,i,o,c,a)}if(Object.setPrototypeOf)Object.setPrototypeOf(read,t);return read}(e.read);e.readSync=typeof e.readSync!=="function"?e.readSync:function(t){return function(n,r,i,o,c){var s=0;while(true){try{return t.call(e,n,r,i,o,c)}catch(e){if(e.code==="EAGAIN"&&s<10){s++;continue}throw e}}}}(e.readSync);function patchLchmod(e){e.lchmod=function(t,n,i){e.open(t,r.O_WRONLY|r.O_SYMLINK,n,(function(t,r){if(t){if(i)i(t);return}e.fchmod(r,n,(function(t){e.close(r,(function(e){if(i)i(t||e)}))}))}))};e.lchmodSync=function(t,n){var i=e.openSync(t,r.O_WRONLY|r.O_SYMLINK,n);var o=true;var c;try{c=e.fchmodSync(i,n);o=false}finally{if(o){try{e.closeSync(i)}catch(e){}}else{e.closeSync(i)}}return c}}function patchLutimes(e){if(r.hasOwnProperty("O_SYMLINK")&&e.futimes){e.lutimes=function(t,n,i,o){e.open(t,r.O_SYMLINK,(function(t,r){if(t){if(o)o(t);return}e.futimes(r,n,i,(function(t){e.close(r,(function(e){if(o)o(t||e)}))}))}))};e.lutimesSync=function(t,n,i){var o=e.openSync(t,r.O_SYMLINK);var c;var s=true;try{c=e.futimesSync(o,n,i);s=false}finally{if(s){try{e.closeSync(o)}catch(e){}}else{e.closeSync(o)}}return c}}else if(e.futimes){e.lutimes=function(e,t,n,r){if(r)process.nextTick(r)};e.lutimesSync=function(){}}}function chmodFix(t){if(!t)return t;return function(n,r,i){return t.call(e,n,r,(function(e){if(chownErOk(e))e=null;if(i)i.apply(this,arguments)}))}}function chmodFixSync(t){if(!t)return t;return function(n,r){try{return t.call(e,n,r)}catch(e){if(!chownErOk(e))throw e}}}function chownFix(t){if(!t)return t;return function(n,r,i,o){return t.call(e,n,r,i,(function(e){if(chownErOk(e))e=null;if(o)o.apply(this,arguments)}))}}function chownFixSync(t){if(!t)return t;return function(n,r,i){try{return t.call(e,n,r,i)}catch(e){if(!chownErOk(e))throw e}}}function statFix(t){if(!t)return t;return function(n,r,i){if(typeof r==="function"){i=r;r=null}function callback(e,t){if(t){if(t.uid<0)t.uid+=4294967296;if(t.gid<0)t.gid+=4294967296}if(i)i.apply(this,arguments)}return r?t.call(e,n,r,callback):t.call(e,n,callback)}}function statFixSync(t){if(!t)return t;return function(n,r){var i=r?t.call(e,n,r):t.call(e,n);if(i){if(i.uid<0)i.uid+=4294967296;if(i.gid<0)i.gid+=4294967296}return i}}function chownErOk(e){if(!e)return true;if(e.code==="ENOSYS")return true;var t=!process.getuid||process.getuid()!==0;if(t){if(e.code==="EINVAL"||e.code==="EPERM")return true}return false}}},654:function(e,t,n){let r;try{r=n(127)}catch(e){r=n(147)}const i=n(5);const{stringify:o,stripBom:c}=n(208);async function _readFile(e,t={}){if(typeof t==="string"){t={encoding:t}}const n=t.fs||r;const o="throws"in t?t.throws:true;let s=await i.fromCallback(n.readFile)(e,t);s=c(s);let a;try{a=JSON.parse(s,t?t.reviver:null)}catch(t){if(o){t.message=`${e}: ${t.message}`;throw t}else{return null}}return a}const s=i.fromPromise(_readFile);function readFileSync(e,t={}){if(typeof t==="string"){t={encoding:t}}const n=t.fs||r;const i="throws"in t?t.throws:true;try{let r=n.readFileSync(e,t);r=c(r);return JSON.parse(r,t.reviver)}catch(t){if(i){t.message=`${e}: ${t.message}`;throw t}else{return null}}}async function _writeFile(e,t,n={}){const c=n.fs||r;const s=o(t,n);await i.fromCallback(c.writeFile)(e,s,n)}const a=i.fromPromise(_writeFile);function writeFileSync(e,t,n={}){const i=n.fs||r;const c=o(t,n);return i.writeFileSync(e,c,n)}const u={readFile:s,readFileSync:readFileSync,writeFile:a,writeFileSync:writeFileSync};e.exports=u},208:function(e){function stringify(e,{EOL:t="\n",finalEOL:n=true,replacer:r=null,spaces:i}={}){const o=n?t:"";const c=JSON.stringify(e,r,i);return c.replace(/\n/g,t)+o}function stripBom(e){if(Buffer.isBuffer(e))e=e.toString("utf8");return e.replace(/^\uFEFF/,"")}e.exports={stringify:stringify,stripBom:stripBom}},5:function(e,t){"use strict";t.fromCallback=function(e){return Object.defineProperty((function(...t){if(typeof t[t.length-1]==="function")e.apply(this,t);else{return new Promise(((n,r)=>{e.call(this,...t,((e,t)=>e!=null?r(e):n(t)))}))}}),"name",{value:e.name})};t.fromPromise=function(e){return Object.defineProperty((function(...t){const n=t[t.length-1];if(typeof n!=="function")return e.apply(this,t);else e.apply(this,t.slice(0,-1)).then((e=>n(null,e)),n)}),"name",{value:e.name})}},491:function(e){"use strict";e.exports=require("assert")},57:function(e){"use strict";e.exports=require("constants")},147:function(e){"use strict";e.exports=require("fs")},17:function(e){"use strict";e.exports=require("path")},781:function(e){"use strict";e.exports=require("stream")},837:function(e){"use strict";e.exports=require("util")}};var t={};function __nccwpck_require__(n){var r=t[n];if(r!==undefined){return r.exports}var i=t[n]={exports:{}};var o=true;try{e[n](i,i.exports,__nccwpck_require__);o=false}finally{if(o)delete t[n]}return i.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var n=__nccwpck_require__(579);module.exports=n})();